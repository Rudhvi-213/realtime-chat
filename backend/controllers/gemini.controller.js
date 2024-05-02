import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const runGemini = async (req, res) => {
  let { prompt } = req.params;

  prompt = prompt.replace("%20", " ");
  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  //   const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  res.status(200).json(text);
  console.log(text);
};
