export const generateUid = () => {
  const minValue = 1;
  const maxValue = Math.pow(2, 32) - 1;

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};
