
import { authOpenai, completePrompt, filterPrompt, extractPrompt } from '../openai/config.mjs';

const twitterText = "Ivy loves hotpot and boxing.";

const openai = authOpenai();

console.log("Filtering Twitter text.");
const isUnsave = await filterPrompt(openai, twitterText);

if (isUnsave){
  console.log("Twitter text safe. extracting info.");
  const extractedInfo = await extractPrompt(openai, twitterText);
  console.log(extractedInfo);
  const infoArray = extractedInfo.replace(/\s/g, '').split(',');
  let promptText = undefined;
  if (infoArray.length > 2){
    promptText = `Dear ${infoArray[0]}, Please accept this Valentine's greeting fully into your heart and also your bloodstream. You love ${infoArray[1]}, I smell ${infoArray[2]}, and I promise you that`
  }
  console.log("Assembled prompt: " + promptText);
  const ouput = await completePrompt(openai, "text-curie-001", promptText);
  console.log(ouput);
} else {
  console.log("Twitter text unsafe.");
}

