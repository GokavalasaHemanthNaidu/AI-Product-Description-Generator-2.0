import { GoogleGenAI } from "@google/genai";
import type { ProductData } from '../types';

// Safely access the API key, prioritizing localStorage for "Bring Your Own Key" support
const getApiKey = () => {
  // 1. Try localStorage first
  try {
    const localKey = localStorage.getItem('GEMINI_API_KEY');
    if (localKey) return localKey;
  } catch (e) {}

  // 2. Try Vite env variables
  if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  
  // 3. Fallback to the define plugin replacement if it exists
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {}
  
  // 4. Try direct replacement
  try {
    // @ts-ignore
    if (typeof API_KEY !== 'undefined') return API_KEY;
  } catch (e) {}

  return null;
};

export async function generateDescription(data: ProductData): Promise<string> {
  const { productName, keyFeatures, targetAudience } = data;

  const apiKey = getApiKey();

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

  // If we have a Gemini API key, use it for premium results.
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Error generating description via Gemini API:", error);
      if (error instanceof Error) {
          throw new Error(`Gemini API Generation failed: ${error.message}`);
      }
      throw new Error("An unknown error occurred during Gemini generation.");
    }
  }
  
  // Fallback to completely free public API (Pollinations.ai) if no API key is provided!
  try {
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are an expert AI Copywriter.' },
          { role: 'user', content: prompt }
        ],
        model: 'openai'
      })
    });
    
    if (!response.ok) {
      throw new Error("Free fallback API failed.");
    }
    
    return await response.text();
  } catch (error) {
    console.error("Free fallback failed:", error);
    throw new Error("Could not connect to the free AI service. Please try again later or provide a Gemini API key in the settings for guaranteed access.");
  }
}
