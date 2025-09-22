import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, TranscriptEntry } from "../types";

// FIX: Always use new GoogleGenAI({ apiKey: process.env.API_KEY });
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise summary of the video content, in 3-5 sentences.",
    },
    keyPoints: {
      type: Type.ARRAY,
      description: "A list of the 3 to 5 most important key points or takeaways from the video.",
      items: {
        type: Type.STRING,
      },
    },
    sentiment: {
        type: Type.STRING,
        description: "The overall sentiment of the video content. Can be 'Positive', 'Negative', or 'Neutral'.",
        enum: ["Positive", "Negative", "Neutral"],
    }
  },
  required: ["summary", "keyPoints", "sentiment"],
};

export const analyzeVideoTranscript = async (transcript: TranscriptEntry[]): Promise<AnalysisResult> => {
  const transcriptText = transcript.map(t => t.text).join(' ');

  const prompt = `Analyze the following YouTube video transcript and provide a summary, key points, and the overall sentiment.
  
  Transcript:
  "${transcriptText}"
  
  Provide your analysis in the JSON format requested.`;

  try {
    // FIX: Use ai.models.generateContent to query GenAI.
    const response = await ai.models.generateContent({
      // FIX: Use 'gemini-2.5-flash' for general text tasks.
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // FIX: Use responseMimeType and responseSchema for JSON output.
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    // FIX: Access the text property directly from the response.
    const jsonText = response.text;
    const result: AnalysisResult = JSON.parse(jsonText);

    if (!result.summary || !result.keyPoints || !result.sentiment) {
        throw new Error("Invalid analysis format received from API.");
    }
    
    return result;
  } catch (error) {
    console.error("Error analyzing transcript with Gemini API:", error);
    throw new Error("Failed to analyze video transcript. The AI model may be temporarily unavailable.");
  }
};
