import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Legal Document Analysis</h1>
      <p className="hero-subtitle">
        Simplify complex contracts with AI-powered summarization and Q&A
      </p>
      <div className="disclaimer">
        <AlertTriangle size={16} />
        Not legal advice - verify with a professional
      </div>
    </section>
  );
}
