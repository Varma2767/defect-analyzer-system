export default function ResultDisplay({ result, error }) {
  if (error) {
    return (
      <div className="result result--error">
        <h3>Analysis Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) return null;

  const { defectType, confidence, description, recommendation } = result;
  const isNoDefect = defectType === "No Defect";

  return (
    <div className={`result ${isNoDefect ? "result--ok" : "result--defect"}`}>
      <div className="result__header">
        <span className="result__label">Detected Defect</span>
        <h2 className="result__defect-name">{defectType}</h2>
      </div>

      <div className="result__confidence">
        <div className="confidence-bar">
          <div
            className="confidence-bar__fill"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <span>{confidence}% confidence</span>
      </div>

      <div className="result__body">
        <div>
          <h4>Description</h4>
          <p>{description}</p>
        </div>
        <div>
          <h4>Recommended Action</h4>
          <p>{recommendation}</p>
        </div>
      </div>
    </div>
  );
}
