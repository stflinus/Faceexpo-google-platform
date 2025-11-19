import { GoogleGenAI } from "@google/genai";

export const generateDescription = async (title: string, tags: string[]): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "Connect your Gemini API Key to generate magic descriptions!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";
    
    const prompt = `
      You are an AI assistant for an edgy, futuristic art platform called FaceExpo.
      Write a short, captivating, 2-sentence caption for an art piece titled "${title}" with tags: ${tags.join(', ')}.
      Tone: Neon, mysterious, energetic.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description. Please try again.";
  }
};