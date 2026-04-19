import { GoogleGenAI } from "@google/genai";
import type { ProductData } from '../types';

// Safely access the API key using Vite's import.meta.env or the defined process fallback
const getApiKey = () => {
  // Try Vite env variables first (best practice)
  if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  
  // Fallback to the define plugin replacement if it exists
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore ReferenceError for process
  }
  
  // Try direct replacement if Vite replaced it
  try {
    // @ts-ignore
    if (typeof API_KEY !== 'undefined') return API_KEY;
  } catch (e) {}

  return null;
};

export async function generateDescription(data: ProductData): Promise<string> {
  const { productName, keyFeatures, targetAudience } = data;

  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("API key not found. Please create a .env.local file with VITE_GEMINI_API_KEY=your_key and restart the server.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Craft a compelling and persuasive product description for the following product:

    **Product Name:** ${productName}
    
    **Target Audience:** ${targetAudience}
    
    **Key Features & Benefits:**
    ${keyFeatures}
    
    **Instructions:**
    1. Start with a strong, attention-grabbing hook.
    2. Focus on the benefits for the target audience, not just the features.
    3. Use a persuasive and enthusiastic tone.
    4. Keep it concise and easy to read (2-3 paragraphs).
    5. End with a clear call to action.
    `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description via Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Generation failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during generation.");
  }
}
