/*
 * The function to check if the string is a URL
 *
 * @param {string} mbUrl - string to checking
 *
 * @returns {boolean} - is the string a URL
 *
 *
 * */

export const isUrl = (mbUrl: string) => {
  try {
    return Boolean(new URL(mbUrl));
  } catch (error) {
    return false;
  }
};
