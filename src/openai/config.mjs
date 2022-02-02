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

  return response.data.choices[0].text;
}

const filterPrompt = async (openaiClient, promptText = undefined) => {

  if (!promptText) return

  const response = await openaiClient.createCompletion("content-filter-alpha", {
    "prompt": "<|endoftext|>"+promptText+"\n--\nLabel:",
    "temperature": 0,
    "max_tokens": 1,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "logprobs": 10
  });

  return response.data.choices[0].text;
}

const extractPrompt = async (openaiClient, promptText = undefined) => {

  if (!promptText) return

  const response = await openaiClient.createCompletion("text-babbage-001", {
    "prompt": "Q: Babe, send one to Steve. Loves chips and cheese A: Steve, chips, cheese Q: " + promptText + " A:",
    "temperature": 0,
    "max_tokens": 20,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "best_of": 1
  });

  return response.data.choices[0].text;
}

export { authOpenai, completePrompt, filterPrompt, extractPrompt}