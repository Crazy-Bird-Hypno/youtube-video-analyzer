export interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}

export interface TranscriptEntry {
  text: string;
  start: number;
  duration: number;
}
