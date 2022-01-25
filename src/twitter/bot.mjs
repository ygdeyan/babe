import { auth, postReplyWithMedia } from './config.mjs';

const client = auth();

client.stream('statuses/filter', { track: '#deyanart' }, (stream) => {
  console.log("Searching for tweets...");

  // when a tweet is found
  stream.on('data', (tweet) => {
    console.log("Found one!");
    console.log("Recieved tweet reading....", tweet.text);

    console.log("Replying to tweet with video.");
    postReplyWithMedia(client, "../../out/video.mp4", tweet);

    stream.on('error', (error) => {
      console.log(error);
    });
  });
});

