import { auth, postReplyWithMedia } from './config.mjs';
import { authOpenai, completePrompt } from '../openai/config.mjs';

const client = auth();
const openai = authOpenai();

const promptRe = /name\s*=\s*(.*), likes\s*=\s*(.*)/i;

const onStream = (stream) => {
  console.log("Searching for tweets...");

  // when a tweet is found
  stream.on('data', onData);

  stream.on('error', (error) => {
    console.log(error);
  });
}

const onData = async (tweet) => {
  console.log("Found one!");
  console.log("Recieved tweet reading....", tweet.text);

  const promptInfo = tweet.text.match(promptRe);
  const promptName = promptInfo[1];
  const promptLikes = promptInfo[2].split(',');
  let promptText = undefined;
  if (promptName && promptLikes.length > 1){
    promptText = `Dear ${promptName}, Please accept this Valentine's greeting fully into your heart and also your bloodstream. You love ${promptLikes[0]}, I smell ${promptLikes[1]}, and I promise you that`
  }

  console.log(promptText);
  const ouput = await completePrompt(openai, "text-curie-001", promptText);
  console.log(ouput);

  console.log("Replying to tweet with video.");
  postReplyWithMedia(client, "../../out/video.mp4", tweet, promptText + ouput);
}

client.stream('statuses/filter', { track: '#deyanart' }, onStream);

