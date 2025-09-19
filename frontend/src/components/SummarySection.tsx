import React, { useState } from 'react';
import { FileText, Loader2, AlertCircle } from 'lucide-react';
import { analyze } from '../api';

interface SummarySectionProps {
  text: string;
  risks: [string, number][];
}

export default function SummarySection({ text, risks }: SummarySectionProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const { result } = await analyze("summarize", text);
      setSummary(result || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card summary-card fade-in">
      <div className="card-header">
        <FileText className="card-icon" />
        <h3 className="card-title">Document Summary</h3>
      </div>
      
      <button
        className="btn btn-primary"
        onClick={handleSummarize}
        disabled={loading || !text}
      >
        {loading ? (
          <>
            <Loader2 className="spinner" size={16} />
            Analyzing...
          </>
        ) : (
          'Generate Summary'
        )}
      </button>

      {summary && (
        <div className="result-content slide-up">
          {summary}
        </div>
      )}

      {risks.length > 0 && (
        <div>
          <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} style={{ color: 'var(--danger)' }} />
            Risk Indicators
          </h4>
          <div className="risk-tags">
            {risks.map(([keyword], i) => (
              <span key={i} className="risk-tag">
                <AlertCircle size={12} />
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
