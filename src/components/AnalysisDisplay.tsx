import React from 'react';
import { AnalysisResult } from '../types';
import CopyButton from './CopyButton';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const formatForCopy = () => {
    let text = `Summary:\n${analysis.summary}\n\n`;
    text += `Key Points:\n`;
    analysis.keyPoints.forEach(point => {
      text += `- ${point}\n`;
    });
    text += `\nSentiment: ${analysis.sentiment}`;
    return text;
  };
  
  const sentimentColor = {
    Positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Neutral: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6 w-full animate-fade-in">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analysis Result</h2>
        <CopyButton textToCopy={formatForCopy()} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Summary</h3>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{analysis.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Points</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          {analysis.keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

       <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Sentiment</h3>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${sentimentColor[analysis.sentiment]}`}>
            {analysis.sentiment}
        </span>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
