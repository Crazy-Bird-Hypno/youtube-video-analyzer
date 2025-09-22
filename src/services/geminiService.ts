import { GoogleGenAI, Type } from "@google/genai";
import { Analysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a video transcript using the Gemini API.
 * @param transcript The transcript of the video.
 * @returns A promise that resolves to an Analysis object.
 */
export const analyzeVideoTranscript = async (transcript: string): Promise<Analysis> => {
  // FIX: Use systemInstruction to separate the prompt from the data, which is a better practice.
  const systemInstruction = `Analyze the video transcript provided. Provide a concise and engaging title for the video, a comprehensive summary of its content, and list the most important key takeaways as an array of strings. The output must be in JSON format matching the provided schema.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "A concise and engaging title for the video."
      },
      summary: {
        type: Type.STRING,
        description: "A detailed summary of the video transcript."
       },
      keyTakeaways: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of key takeaways from the video."
      },
    },
    // FIX: Replaced `required` with `propertyOrdering` to align with the provided Gemini API coding guidelines example for JSON responses.
    propertyOrdering: ["title", "summary", "keyTakeaways"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: transcript,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // FIX: Simplified JSON parsing. With responseMimeType set to "application/json",
    // the Gemini API should return a clean JSON string, making markdown stripping unnecessary.
    const jsonText = response.text.trim();
    const analysisResult: Analysis = JSON.parse(jsonText);
    return analysisResult;

  } catch (error) {
    console.error("Error analyzing transcript with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during video analysis.");
  }
};
