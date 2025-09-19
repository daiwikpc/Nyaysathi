import React, { useRef, useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { uploadFile } from '../api';

interface UploadZoneProps {
  onLoaded: (payload: any) => void;
}

export default function UploadZone({ onLoaded }: UploadZoneProps) {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;
    
    setError("");
    setLoading(true);
    
    try {
      const data = await uploadFile(file);
      onLoaded(data);
    } catch (ex: any) {
      setError(ex.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) handleFileSelect(files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="upload-section">
      <div className="card">
        <div className="card-header">
          <FileText className="card-icon" />
          <h2 className="card-title">Upload Document</h2>
        </div>
        
        <div
          className={`upload-area ${dragOver ? 'dragover' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {loading ? (
            <div className="loading">
              <Loader2 className="spinner" />
              <span>Processing document...</span>
            </div>
          ) : (
            <>
              <Upload className="upload-icon" />
              <div className="upload-text">
                Drop your legal document here or click to browse
              </div>
              <div className="upload-subtext">
                Supports PDF, DOCX, and TXT files
              </div>
            </>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            style={{ display: 'none' }}
          />
        </div>
        
        {error && (
          <div style={{ 
            color: 'var(--danger)', 
            marginTop: '1rem', 
            padding: '0.75rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '0.5rem'
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
