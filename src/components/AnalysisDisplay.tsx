import React from 'react';
import { Analysis } from '../types';
import CopyButton from './CopyButton';

interface AnalysisDisplayProps {
  analysis: Analysis;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {

  const containerStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    marginTop: '1.5rem',
    backgroundColor: '#f9fafb',
  };
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };
  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  };
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.25rem',
  };
  const summaryStyle: React.CSSProperties = {
    lineHeight: 1.6,
  };
  const listStyle: React.CSSProperties = {
    paddingLeft: '1.5rem',
  };

  const fullTextToCopy = `
Title: ${analysis.title}

Summary:
${analysis.summary}

Key Takeaways:
${analysis.keyTakeaways.map(item => `- ${item}`).join('\n')}
  `.trim();

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{analysis.title}</h2>
        <CopyButton textToCopy={fullTextToCopy} />
      </div>

      <h3 style={sectionTitleStyle}>Summary</h3>
      <p style={summaryStyle}>{analysis.summary}</p>

      <h3 style={sectionTitleStyle}>Key Takeaways</h3>
      <ul style={listStyle}>
        {analysis.keyTakeaways.map((takeaway, index) => (
          <li key={index}>{takeaway}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisDisplay;
