import Anthropic from "@anthropic-ai/sdk";
import { DEFECT_NAMES } from "../config/defectCatalogue.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Claude vision-capable model used for defect classification.
const MODEL = "claude-sonnet-5";

/**
 * Sends a steel surface image to Claude and asks it to classify the defect
 * against the predefined catalogue. Returns a structured JSON result.
 *
 * @param {Buffer} imageBuffer - raw image bytes
 * @param {string} mimeType - e.g. "image/jpeg"
 * @returns {Promise<Object>} classification result
 */
export async function classifyDefect(imageBuffer, mimeType) {
  const base64Image = imageBuffer.toString("base64");

  const systemPrompt = `You are a quality-control vision assistant for a steel manufacturing plant.
Your job is to inspect an image of a steel surface and classify any visible defect
into EXACTLY ONE of the following predefined categories:

${DEFECT_NAMES.map((n) => `- ${n}`).join("\n")}

Rules:
1. Choose the single best-matching category from the list above. Do not invent new categories.
2. If the surface looks clean and defect-free, classify it as "No Defect".
3. Respond ONLY with a valid JSON object, no markdown fences, no extra text, in this exact shape:
{
  "defectType": "<one of the category names above>",
  "confidence": <number between 0 and 100>,
  "description": "<1-2 sentence explanation of what visual evidence led to this classification>",
  "recommendation": "<1 short sentence on suggested quality-control action>"
}`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 500,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType,
              data: base64Image,
            },
          },
          {
            type: "text",
            text: "Classify the defect visible on this steel surface image according to the rules given.",
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock) {
    throw new Error("No text response received from the model.");
  }

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();

  let result;
  try {
    result = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `Failed to parse model response as JSON: ${err.message}. Raw response: ${cleaned}`
    );
  }

  return result;
}
