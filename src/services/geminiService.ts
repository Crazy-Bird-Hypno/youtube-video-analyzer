import React, { useState } from 'react';
import YouTubeIcon from './icons/YouTubeIcon';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && !isLoading) {
      onSubmit(url);
    }
  };

  // Inline styles for simplicity
  const formStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginBottom: '1rem',
  };
  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    flexGrow: 1,
  };
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
    width: '24px',
    height: '24px',
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 3rem',
    borderRadius: '0.375rem',
    border: '1px solid #D1D5DB',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };
  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    backgroundColor: isLoading ? '#9CA3AF' : '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainerStyle}>
        <div style={iconStyle}>
          <YouTubeIcon />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL..."
          style={inputStyle}
          disabled={isLoading}
        />
      </div>
      <button type="submit" style={buttonStyle} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default UrlInputForm;
