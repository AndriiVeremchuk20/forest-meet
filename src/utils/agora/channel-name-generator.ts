// function to generate random channel name
// ex: potato-3394-3938, enserfment-3030-6865

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

const getRandomNumber = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

const channelNameGenerator = async () => {
  const word = await getRandomWord();

  return `${word}-${getRandomNumber()}-${getRandomNumber()}`;
};

export default channelNameGenerator;
