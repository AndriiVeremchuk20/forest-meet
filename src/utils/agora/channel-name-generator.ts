// function to generate random channel name

import ky from "ky";
import {generate} from "random-words";

const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com";

const randomWordApiClient = ky.create({
  prefixUrl: RANDOM_WORD_API_URL,
  headers: {
    accept: "application/ld+json",
  },
});

const getRandomWord = async () => {
  try {
    const randomWord = await randomWordApiClient.get("word").json<[string]>();

    return randomWord[0];
  } catch (error) {
    console.log(error);
  }
};

const generateChannelName = async () => {
  const words = generate(5) as string[];
	//console.log(generate().join());
	//const words = await Promise.all([
    //getRandomWord(),
    //getRandomWord(),
    //getRandomWord(),
  //]);
  return words.join("-");
};

export default generateChannelName;
