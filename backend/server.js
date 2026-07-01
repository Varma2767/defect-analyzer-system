import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRouter from "./src/routes/analyze.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "steel-defect-analyzer-backend" });
});

app.use("/api", analyzeRouter);

// Basic error handler (e.g. for multer file-size/type errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ success: false, error: err.message });
});

app.listen(PORT, () => {
  console.log(`Steel Defect Analyzer backend running on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn(
      "WARNING: ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key."
    );
  }
});
