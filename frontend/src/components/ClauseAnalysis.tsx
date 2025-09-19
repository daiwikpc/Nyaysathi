import React, { useState } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { analyze } from '../api';

interface ClauseAnalysisProps {
  sections: [string, string][];
}

export default function ClauseAnalysis({ sections }: ClauseAnalysisProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    const text = sections[selectedIndex]?.[1] ?? "";
    setLoading(true);
    try {
      const { result } = await analyze("simplify", text);
      setExplanation(result || "");
    } finally {
      setLoading(false);
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className="card clause-card fade-in">
      <div className="card-header">
        <BookOpen className="card-icon" />
        <h3 className="card-title">Clause Analysis</h3>
      </div>
      
      <div className="grid grid-2" style={{ gap: '1.5rem' }}>
        <div>
          <label className="input-label">Select Section</label>
          <select
            className="input"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
          >
            {sections.map(([title], i) => (
              <option key={i} value={i}>
                {title.slice(0, 60)}...
              </option>
            ))}
          </select>
          
          <button
            className="btn btn-secondary"
            onClick={handleExplain}
            disabled={loading}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            {loading ? (
              <>
                <Loader2 className="spinner" size={16} />
                Analyzing...
              </>
            ) : (
              'Explain in Plain Language'
            )}
          </button>
        </div>

        <div>
          <label className="input-label">Original Text</label>
          <div className="result-content" style={{ height: '200px', overflow: 'auto' }}>
            {sections[selectedIndex]?.[1] || "No content"}
          </div>
        </div>
      </div>

      {explanation && (
        <div style={{ marginTop: '1.5rem' }}>
          <label className="input-label">Plain Language Explanation</label>
          <div className="result-content slide-up">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}
