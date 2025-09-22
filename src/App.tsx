import React, { useState } from 'react';
import UrlInputForm from './components/UrlInputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import Loader from './components/Loader';
import { AnalysisResult } from './types';
// FIX: The import path for `fetchTranscript` was invalid. A mock implementation has been added to `src/utils/youtube.ts` and is imported from there.
import { getYouTubeVideoId, fetchTranscript } from './utils/youtube';
import { analyzeVideoTranscript } from './services/geminiService';

function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setAnalysis(null);
    setError(null);

    try {
      const videoId = getYouTubeVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL. Could not extract video ID.');
      }
      
      // NOTE: In a real app, transcript fetching requires a backend.
      // We are using a mock implementation here.
      // You can test with videoId 'mock-id-success' to see the flow.
      const transcript = await fetchTranscript(videoId);
      
      if (!transcript || transcript.length === 0) {
        throw new Error('Could not fetch transcript for this video. It might be disabled or unavailable.');
      }
      
      const analysisResult = await analyzeVideoTranscript(transcript);
      setAnalysis(analysisResult);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white">
                YouTube Video Analyzer
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Get instant summaries and key insights from any YouTube video.
            </p>
        </header>

        <UrlInputForm onSubmit={handleUrlSubmit} isLoading={isLoading} />
        
        <div className="w-full max-w-2xl mt-8">
            {isLoading && <Loader />}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center" role="alert">{error}</div>}
            {analysis && <AnalysisDisplay analysis={analysis} />}
        </div>
      </div>
    </div>
  );
}

export default App;
