import { useState, useEffect } from "react";
import ImageUploader from "./components/ImageUploader";
import ResultDisplay from "./components/ResultDisplay";
import DefectCatalogue from "./components/DefectCatalogue";
import Loader from "./components/Loader";
import { analyzeDefect } from "./services/api";
import "./App.css";

export default function App() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageSelected = (file) => {
    setImageFile(file);
    setResult(null);
    setError(null);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeDefect(imageFile);
      setResult(data.result);
    } catch (err) {
      const message =
        err?.response?.data?.error || err.message || "Something went wrong while analyzing the image.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>🏭 Tata Steel — Surface Defect Analyzer</h1>
        <p>Upload an image of a steel surface to automatically detect and classify defects.</p>
      </header>

      <main className="app__main">
        <ImageUploader
          onImageSelected={handleImageSelected}
          onAnalyze={handleAnalyze}
          previewUrl={previewUrl}
          loading={loading}
          disabled={!imageFile}
        />

        {loading && <Loader />}
        <ResultDisplay result={result} error={error} />

        <DefectCatalogue />
      </main>

      <footer className="app__footer">
        <p>Quality Control · AI Vision Model</p>
      </footer>
    </div>
  );
}
