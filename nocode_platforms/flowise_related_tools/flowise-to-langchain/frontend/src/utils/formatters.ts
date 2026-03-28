import { RecentConversion } from '../types';

/**
 * Format a date string for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

/**
 * Get status icon for conversion status
 */
export const getStatusIcon = (status: RecentConversion['status']): string => {
  switch (status) {
    case 'success':
      return '✅';
    case 'failed':
      return '❌';
    case 'pending':
      return '⏳';
    default:
      return '❓';
  }
};

/**
 * Get format icon for different programming languages
 */
export const getFormatIcon = (format: 'typescript' | 'javascript' | 'python'): string => {
  switch (format) {
    case 'typescript':
      return '🟦';
    case 'javascript':
      return '🟨';
    case 'python':
      return '🐍';
    default:
      return '📄';
  }
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i) * 10) / 10} ${sizes[i]}`;
};

/**
 * Format duration in milliseconds to human readable format
 */
export const formatDuration = (ms: number): string => {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${Math.round(ms / 100) / 10}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.round((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
};

/**
 * Format percentage with appropriate precision
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${Math.round(percentage * 10) / 10}%`;
};

/**
 * Truncate text to a maximum length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength - 3)}...`;
};

/**
 * Get a color class based on status
 */
export const getStatusColor = (status: RecentConversion['status']): string => {
  switch (status) {
    case 'success':
      return 'text-green-600';
    case 'failed':
      return 'text-red-600';
    case 'pending':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Get complexity color class
 */
export const getComplexityColor = (complexity: 'low' | 'medium' | 'high'): string => {
  switch (complexity) {
    case 'low':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'high':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Sanitize filename for safe usage
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
};

/**
 * Format code language name for display
 */
export const formatLanguageName = (language: string): string => {
  switch (language.toLowerCase()) {
    case 'typescript':
      return 'TypeScript';
    case 'javascript':
      return 'JavaScript';
    case 'python':
      return 'Python';
    case 'json':
      return 'JSON';
    default:
      return language.charAt(0).toUpperCase() + language.slice(1);
  }
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

/**
 * Get programming language from file extension
 */
export const getLanguageFromExtension = (extension: string): string => {
  switch (extension.toLowerCase()) {
    case 'ts':
      return 'typescript';
    case 'js':
      return 'javascript';
    case 'py':
      return 'python';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    default:
      return 'text';
  }
};

/**
 * Format validation severity
 */
export const formatValidationSeverity = (severity: 'error' | 'warning' | 'info'): string => {
  switch (severity) {
    case 'error':
      return '🚫 Error';
    case 'warning':
      return '⚠️ Warning';
    case 'info':
      return 'ℹ️ Info';
    default:
      return severity;
  }
};