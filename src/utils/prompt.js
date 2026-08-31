import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

const promptAI = async (input) => {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input,
  });

  return interaction.output_text;
};

export default promptAI;
