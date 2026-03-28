import React, { useCallback, useRef, useState } from 'react';
import { DashboardProps, RecentConversion } from '../types';
import { formatDate, getStatusIcon, getFormatIcon } from '../utils/formatters';
import './Dashboard.css';

interface ExtendedDashboardProps extends DashboardProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export const Dashboard: React.FC<ExtendedDashboardProps> = ({
  recentConversions,
  onLoadConversion,
  onDeleteConversion,
  onNewConversion,
  onFileUpload,
  isLoading,
  className,
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file.type === 'application/json' || file.name.endsWith('.json')) {
      onFileUpload(file);
    } else {
      alert('Please select a valid JSON file');
    }
  }, [onFileUpload]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDeleteClick = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversion?')) {
      onDeleteConversion(id);
    }
  }, [onDeleteConversion]);

  return (
    <div className={`dashboard ${className || ''}`}>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Convert your Flowise flows to LangChain code</p>
      </div>

      <div className="dashboard-content">
        {/* File Upload Section */}
        <section className="upload-section">
          <div
            className={`upload-area ${dragOver ? 'drag-over' : ''} ${isLoading ? 'loading' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            
            {isLoading ? (
              <div className="upload-loading">
                <div className="spinner"></div>
                <p>Validating flow...</p>
              </div>
            ) : (
              <div className="upload-content">
                <div className="upload-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Upload Flowise Export</h3>
                <p>Drag and drop your Flowise JSON file here, or click to browse</p>
                <button type="button" className="upload-button">
                  Choose File
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Recent Conversions Section */}
        <section className="recent-section">
          <div className="section-header">
            <h3>Recent Conversions</h3>
            {recentConversions.length > 0 && (
              <button 
                className="new-conversion-button"
                onClick={onNewConversion}
                type="button"
              >
                New Conversion
              </button>
            )}
          </div>

          {recentConversions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h4>No conversions yet</h4>
              <p>Upload your first Flowise export to get started</p>
            </div>
          ) : (
            <div className="conversions-grid">
              {recentConversions.map((conversion) => (
                <div
                  key={conversion.id}
                  className={`conversion-card ${conversion.status}`}
                  onClick={() => onLoadConversion(conversion.id)}
                >
                  <div className="conversion-header">
                    <div className="conversion-title">
                      <h4>{conversion.name}</h4>
                      <span className="conversion-status">
                        {getStatusIcon(conversion.status)}
                        {conversion.status}
                      </span>
                    </div>
                    <button
                      className="delete-button"
                      onClick={(e) => handleDeleteClick(e, conversion.id)}
                      type="button"
                      aria-label="Delete conversion"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                        <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1 2-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2"/>
                        <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="conversion-details">
                    <div className="conversion-meta">
                      <span className="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {conversion.nodeCount} nodes
                      </span>
                      <span className="meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {conversion.filesGenerated} files
                      </span>
                      <span className="meta-item">
                        {getFormatIcon(conversion.format)}
                        {conversion.format}
                      </span>
                    </div>
                    <div className="conversion-date">
                      {formatDate(conversion.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Getting Started Section */}
        <section className="getting-started">
          <h3>Getting Started</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Export from Flowise</h4>
                <p>Export your flow as JSON from Flowise studio</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Upload & Convert</h4>
                <p>Upload your JSON file and choose conversion settings</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Test & Deploy</h4>
                <p>Test your converted code and deploy to production</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {children}
    </div>
  );
};