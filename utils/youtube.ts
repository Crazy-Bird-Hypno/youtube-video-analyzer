import { VideoDetails } from '../types';

/**
 * Extracts the YouTube video ID from a given URL.
 * Supports various YouTube URL formats.
 * @param url The YouTube URL.
 * @returns The video ID or null if not found.
 */
export function getVideoIdFromUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
}

/**
 * Fetches video details, including the transcript.
 * NOTE: This is a mock implementation. A real-world application would
 * require a backend service or a third-party API to fetch YouTube transcripts
 * reliably, as this is not directly available on the client-side.
 * @param videoId The ID of the YouTube video.
 * @returns A promise that resolves to the video details.
 */
export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  console.log(`Fetching details for video: ${videoId}`);
  
  // Mocked response for demonstration purposes.
  // In a real app, you would make an API call here.
  return Promise.resolve({
    id: videoId,
    title: 'Example Video Title',
    transcript: `
      Hello and welcome to this example video. Today, we're going to discuss a fascinating topic. 
      The key point is to understand the core concepts. First, we'll cover the basics. 
      Second, we'll dive into the advanced features. Finally, we'll wrap up with a summary. 
      Remember to subscribe for more content. This transcript is a placeholder for the real one.
      Gemini API is a powerful tool for developers. By leveraging its capabilities, you can build amazing applications.
      This demonstration shows how to analyze a video transcript to extract meaningful insights.
    `,
  });
}
