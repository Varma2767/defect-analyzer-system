import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { classifyDefect } from "../services/claudeService.js";
import { DEFECT_CATALOGUE } from "../config/defectCatalogue.js";

const router = Router();

// GET /api/defect-catalogue - returns the predefined list of defect categories
router.get("/defect-catalogue", (req, res) => {
  res.json({ catalogue: DEFECT_CATALOGUE });
});

// POST /api/analyze-defect - accepts an image file, returns classification
router.post("/analyze-defect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }

    const result = await classifyDefect(req.file.buffer, req.file.mimetype);

    res.json({
      success: true,
      fileName: req.file.originalname,
      result,
    });
  } catch (error) {
    console.error("Defect analysis error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze image.",
    });
  }
});

export default router;
