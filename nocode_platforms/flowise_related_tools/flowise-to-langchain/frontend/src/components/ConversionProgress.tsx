import React, { useState, useEffect, useCallback } from 'react';
import { FlowiseFlow, ConversionOptions } from '../types';

interface ConversionProgressProps {
  flow: FlowiseFlow;
  options: ConversionOptions;
  conversionId?: string;
  onProgress?: (progress: number, step: string) => void;
  onComplete?: (result: any) => void;
  onError?: (error: Error) => void;
  realTimeTracking?: boolean;
}

export const ConversionProgress: React.FC<ConversionProgressProps> = ({
  flow,
  options,
  conversionId,
  onProgress,
  onComplete,
  onError,
  realTimeTracking = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | null>(null);
  const [startTime] = useState(Date.now());
  
  const conversionSteps = [
    { id: 'parse', label: 'Parsing Flow', icon: '📄', weight: 15 },
    { id: 'validate', label: 'Validating Nodes', icon: '✅', weight: 10 },
    { id: 'transform', label: 'Transforming IR', icon: '🔄', weight: 25 },
    { id: 'generate', label: 'Generating Code', icon: '⚡', weight: 35 },
    { id: 'format', label: 'Formatting Output', icon: '✨', weight: 10 },
    { id: 'complete', label: 'Complete', icon: '🎉', weight: 5 },
  ];

  const updateProgress = useCallback((newProgress: number, stepName?: string) => {
    setProgress(newProgress);
    
    // Calculate current step based on weighted progress
    let cumulativeWeight = 0;
    for (let i = 0; i < conversionSteps.length; i++) {
      cumulativeWeight += conversionSteps[i].weight;
      if (newProgress <= cumulativeWeight) {
        setCurrentStep(i);
        break;
      }
    }
    
    // Calculate estimated time remaining
    const elapsed = Date.now() - startTime;
    const rate = newProgress / elapsed;
    if (rate > 0 && newProgress < 100) {
      const remaining = (100 - newProgress) / rate;
      setEstimatedTimeRemaining(remaining);
    }
    
    onProgress?.(newProgress, stepName || conversionSteps[currentStep]?.label || 'Processing');
    
    if (newProgress >= 100) {
      setIsComplete(true);
      setEstimatedTimeRemaining(null);
      onComplete?.({ progress: 100, duration: Date.now() - startTime });
    }
  }, [onProgress, onComplete, currentStep, startTime]);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    const errorObj = new Error(errorMessage);
    onError?.(errorObj);
  }, [onError]);

  useEffect(() => {
    if (realTimeTracking && conversionId) {
      // Real-time tracking via API polling
      const pollInterval = setInterval(async () => {
        try {
          // This would make an actual API call to get conversion status
          const response = await fetch(`/api/flows/conversion/${conversionId}/status`);
          const data = await response.json();
          
          if (data.error) {
            handleError(data.error);
            clearInterval(pollInterval);
            return;
          }
          
          updateProgress(data.progress, data.currentStep);
          
          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.warn('Failed to poll conversion status:', error);
        }
      }, 1000);
      
      return () => clearInterval(pollInterval);
    } else {
      // Simulated progress for demo/fallback
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          
          // Weighted progress simulation
          const currentStepWeight = conversionSteps[currentStep]?.weight || 10;
          const increment = (Math.random() * 8 + 2) * (currentStepWeight / 20);
          const newProgress = Math.min(prev + increment, 100);
          
          updateProgress(newProgress);
          return newProgress;
        });
      }, 400 + Math.random() * 600);

      return () => clearInterval(timer);
    }
  }, [realTimeTracking, conversionId, currentStep, updateProgress, handleError]);

  const formatTimeRemaining = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000);
    if (seconds < 60) return `${seconds}s remaining`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s remaining`;
  };

  return (
    <div className="conversion-progress-overlay">
      <div className="conversion-progress">
        <div className="progress-header">
          <h3>Converting Flow</h3>
          <div className="progress-meta">
            <span>{flow.name}</span>
            <span>→</span>
            <span>{options.format.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="progress-content">
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className={`progress-fill ${error ? 'error' : isComplete ? 'complete' : ''}`}
                style={{ 
                  width: `${Math.min(progress, 100)}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <div className="progress-text">
              {error ? (
                <span className="error-text">❌ Error</span>
              ) : isComplete ? (
                <span className="success-text">✅ Complete</span>
              ) : (
                <>
                  {Math.round(Math.min(progress, 100))}%
                  {estimatedTimeRemaining && (
                    <span className="time-remaining">
                      {formatTimeRemaining(estimatedTimeRemaining)}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
              >
                Retry
              </button>
            </div>
          )}
          
          <div className="progress-steps">
            {conversionSteps.map((step, index) => {
              const isActive = index === currentStep && !isComplete && !error;
              const isCompleted = index < currentStep || (isComplete && index <= currentStep);
              const isFailed = error && index === currentStep;
              
              return (
                <div 
                  key={step.id}
                  className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isFailed ? 'failed' : ''}`}
                >
                  <div className="step-icon">
                    {isFailed ? '❌' : isCompleted ? '✅' : step.icon}
                  </div>
                  <div className="step-label">
                    {step.label}
                    {isActive && (
                      <div className="step-progress">
                        <div className="step-progress-bar">
                          <div 
                            className="step-progress-fill"
                            style={{ width: `${((progress % (100 / conversionSteps.length)) / (100 / conversionSteps.length)) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {isActive && !error && (
                    <div className="step-spinner">
                      <div className="spinner"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="progress-details">
            <div className="detail-item">
              <span className="label">Nodes:</span>
              <span className="value">{flow.nodes.length}</span>
            </div>
            <div className="detail-item">
              <span className="label">Target:</span>
              <span className="value">{options.target}</span>
            </div>
            <div className="detail-item">
              <span className="label">Tests:</span>
              <span className="value">{options.includeTests ? 'Yes' : 'No'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Docs:</span>
              <span className="value">{options.includeDocs ? 'Yes' : 'No'}</span>
            </div>
            {estimatedTimeRemaining && (
              <div className="detail-item">
                <span className="label">ETA:</span>
                <span className="value time-remaining">
                  {formatTimeRemaining(estimatedTimeRemaining)}
                </span>
              </div>
            )}
            {isComplete && (
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">
                  {Math.round((Date.now() - startTime) / 1000)}s
                </span>
              </div>
            )}
            {realTimeTracking && conversionId && (
              <div className="detail-item">
                <span className="label">ID:</span>
                <span className="value conversion-id">
                  {conversionId.slice(0, 8)}...
                </span>
              </div>
            )}
          </div>
        </div>
        
        {isComplete && !error && (
          <div className="completion-actions">
            <div className="completion-message">
              🎉 Conversion completed successfully!
            </div>
            <div className="action-buttons">
              <button className="download-button" onClick={() => {/* Download logic */}}>
                📥 Download Files
              </button>
              <button className="view-button" onClick={() => {/* View logic */}}>
                👁️ View Results
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};