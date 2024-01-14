// function to generate random channel name

import ky from "ky";

const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com";

const randomWordApiClient = ky.create({
  prefixUrl: RANDOM_WORD_API_URL,
  headers: {
    accept: "application/ld+json",
  },
});

const getRandomWord = async () => {
  try {
    const randomWord = await randomWordApiClient
      .get("word")
      .json<[string]>()
      .then((res) => res);

    console.log(randomWord[0]);

    return randomWord[0];
  } catch (error) {
    console.log(error);
  }
};

const generateChannelName = async () => {
  const word1 = await getRandomWord();
  const word2 = await getRandomWord();
  const word3 = await getRandomWord();

  return `${word1}-${word2}-${word3}`;
};

export default generateChannelName;
