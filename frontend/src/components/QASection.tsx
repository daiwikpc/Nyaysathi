import React, { useState } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { analyze } from '../api';

interface QASectionProps {
  docText: string;
}

export default function QASection({ docText }: QASectionProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const { result } = await analyze("qa", docText, question);
      setAnswer(result || "");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="card qa-card fade-in">
      <div className="card-header">
        <MessageCircle className="card-icon" />
        <h3 className="card-title">Ask Questions</h3>
      </div>
      
      <div className="input-group">
        <label className="input-label">What would you like to know about this document?</label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., What are the termination conditions?"
            disabled={loading}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAsk}
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <Loader2 className="spinner" size={16} />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>

      {answer && (
        <div className="result-content slide-up">
          <strong>Answer:</strong><br /><br />
          {answer}
        </div>
      )}
    </div>
  );
}
