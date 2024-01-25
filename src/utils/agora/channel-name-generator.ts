import { generate } from "random-words";

const generateChannelName = async () => {
  const words = generate(5) as string[];

  return words.join("-");
};

export default generateChannelName;
