/* eslint-env node */
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';


dotenv.config({ path: "../../.env" });

// auth methods
const authOpenai = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  return openai;
}

const completePrompt = async (openaiClient, model, promptText = undefined) => {

  if (!promptText) {
    promptText = "Dear Steve, Please accept this Valentine's greeting fully into your heart and also your bloodstream. You love football, I smell running, and I promise you that"
  }

  const response = await openaiClient.createCompletion(model, {
    "prompt": promptText,
    "max_tokens": 20,
    "temperature": 1,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null,
    "stop": null,
    "presence_penalty": 1.5,
    "frequency_penalty": 0.5,
    "best_of": 2
  });

  return response;
}

export { authOpenai, completePrompt }