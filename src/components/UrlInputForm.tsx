import React, { useState } from 'react';
import YouTubeIcon from './icons/YouTubeIcon';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
      setError('Please enter a valid YouTube URL.');
      return;
    }
    
    setError('');
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <div className="pl-5">
            <YouTubeIcon className="h-6 w-6 text-red-500" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste YouTube video URL here..."
          className="w-full px-4 py-4 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none"
          disabled={isLoading}
          aria-label="YouTube video URL"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 sm:px-8 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex-shrink-0"
          disabled={isLoading}
        >
          Analyze
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    </form>
  );
};

export default UrlInputForm;
