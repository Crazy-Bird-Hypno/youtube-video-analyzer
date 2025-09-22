// FIX: Added mock fetchTranscript function to resolve import error in App.tsx.
import { TranscriptEntry } from '../types';

export const getYouTubeVideoId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (urlObj.hostname.includes('youtube.com')) {
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return videoId;
      }
    }
  } catch (e) {
    // Fallback for non-standard or partial URLs
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
  }
  return null;
};

// Mock function to simulate fetching a transcript.
// In a real application, this would be a network request to a backend service.
export const fetchTranscript = async (videoId: string): Promise<TranscriptEntry[]> => {
  console.log(`Fetching transcript for videoId: ${videoId}`);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock success for a specific ID, and failure for others to allow testing both paths.
  if (videoId === 'mock-id-success') {
    return [
      { text: "Hello everyone, welcome to my video.", start: 0, duration: 3 },
      { text: "Today we are going to talk about a very interesting topic.", start: 3, duration: 4 },
      { text: "That topic is how to mock API calls.", start: 7, duration: 3 },
      { text: "It's a crucial skill for frontend developers.", start: 10, duration: 3 },
      { text: "It allows you to build your UI without waiting for the backend.", start: 13, duration: 4 },
      { text: "Thank you for watching!", start: 17, duration: 2 },
    ];
  } else {
    // Simulate an error case where the transcript is not available or the ID is invalid.
    return [];
  }
};
