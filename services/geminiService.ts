import { GoogleGenAI } from "@google/genai";
import type { ProductData } from '../types';

export async function generateDescription(data: ProductData): Promise<string> {
  const { productName, keyFeatures, targetAudience } = data;

  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please ensure it is configured in your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
        throw new Error(`An error occurred during generation: ${error.message}`);
    }
    throw new Error("An unknown error occurred during generation.");
  }
}
