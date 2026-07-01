import { useRef, useState } from "react";

export default function ImageUploader({ onImageSelected, onAnalyze, previewUrl, loading, disabled }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, or WEBP).");
      return;
    }
    onImageSelected(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div className="uploader">
      <div
        className={`dropzone ${dragActive ? "dropzone--active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Steel surface preview" className="dropzone__preview" />
        ) : (
          <div className="dropzone__placeholder">
            <span className="dropzone__icon">📷</span>
            <p>Drag & drop a steel surface image here, or click to browse</p>
            <p className="dropzone__hint">JPEG, PNG, or WEBP · up to 10MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <button
        className="analyze-btn"
        onClick={onAnalyze}
        disabled={disabled || loading}
      >
        {loading ? "Analyzing…" : "Analyze Defect"}
      </button>
    </div>
  );
}
