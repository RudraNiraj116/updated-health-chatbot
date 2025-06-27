import { useState } from "react";
import "./Checkup.css";

const Checkup = ({ onBack }) => {
  const [bp, setBp] = useState("");
  const [sugar, setSugar] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
  if (!bp || !sugar || !heartRate) {
    setResult("⚠️ Please fill in all fields.");
    return;
  }

  setResult("⏳ Checking health data...");
  try {
    const response = await fetch("http://localhost:5000/api/gemini/health-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bp, sugar, heartRate }),
    });

    const data = await response.json();

    if (response.ok && data.result) {
      setResult(data.result);
    } else {
      setResult("⚠️ No valid analysis received from Gemini.");
    }
  } catch (error) {
    console.error("❌ Error contacting Gemini API:", error);
    setResult("❌ Failed to fetch analysis. Please try again later.");
  }
};


  return (
    <div className="checkup-wrapper">
      <div className="checkup-header">
        <h2>🩺 Health Checkup</h2>
        <button className="back-btn" onClick={onBack}>← Back to Chat</button>
      </div>

      <div className="checkup-card">
        <div className="form-group">
          <label>Blood Pressure (e.g. 120/80)</label>
          <input
            type="text"
            className="input-bp"
            value={bp}
            onChange={(e) => setBp(e.target.value)}
            placeholder="120/80"
          />
        </div>
        <div className="form-group">
          <label>Blood Sugar (mg/dL)</label>
          <input
            type="number"
            className="input-sugar"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            placeholder="90"
          />
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm)</label>
          <input
            type="number"
            className="input-heart-rate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="75"
          />
        </div>
        <button className="submit-btn" onClick={handleCheck} disabled={loading}>
          {loading ? "Checking..." : "Check Now"}
        </button>

        {result && (
          <div className="result">
            <strong>Analysis:</strong>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkup;
