import React, { useState } from 'react';
import UrlInputForm from './components/UrlInputForm';
import Loader from './components/Loader';
import AnalysisDisplay from './components/AnalysisDisplay';
import { getVideoIdFromUrl, getVideoDetails } from './utils/youtube';
import { analyzeVideoTranscript } from './services/geminiService';
import { Analysis } from './types';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const videoId = getVideoIdFromUrl(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid URL.');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Get video details (including mock transcript)
      const { transcript } = await getVideoDetails(videoId);

      if (!transcript || transcript.trim().length === 0) {
        setError('Could not retrieve transcript for this video.');
        setIsLoading(false);
        return;
      }

      // Step 2: Analyze transcript with Gemini
      const result = await analyzeVideoTranscript(transcript);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Inline styles
  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'sans-serif',
  };
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '2rem',
  };
  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  };
  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: '#6B7280',
  };
  const errorStyle: React.CSSProperties = {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '1rem',
    borderRadius: '0.375rem',
    marginTop: '1rem',
  };

  return (
    <main style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>YouTube Video Analyzer</h1>
        <p style={descriptionStyle}>
          Enter a YouTube URL to get a summary and key takeaways powered by Gemini.
        </p>
      </header>

      <UrlInputForm onSubmit={handleAnalysis} isLoading={isLoading} />

      {isLoading && <Loader />}

      {error && <div style={errorStyle}>{error}</div>}
      
      {analysis && <AnalysisDisplay analysis={analysis} />}

    </main>
  );
};

export default App;
