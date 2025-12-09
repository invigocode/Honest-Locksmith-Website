import { GoogleGenAI } from "@google/genai";
import { ImageResolution } from "../types";

// Helper to get the AI client only when needed to ensure we have the latest key
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please select a key.");
  }
  return new GoogleGenAI({ apiKey });
};

export const checkApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  return false;
};

export const selectApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    const success = await window.aistudio.openSelectKey();
    // Re-check to confirm
    if (success) return true;
    return await checkApiKey();
  }
  return false;
};

export const generateLogo = async (prompt: string, resolution: ImageResolution): Promise<string> => {
  const ai = getAiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: resolution
        }
      }
    });

    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            const base64Data = part.inlineData.data;
            return `data:image/png;base64,${base64Data}`;
          }
        }
      }
    }
    
    throw new Error("No image data received from the model.");
  } catch (error) {
    console.error("Error generating logo:", error);
    throw error;
  }
};