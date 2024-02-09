/*
 * The function to check if the string is a URL
 *
 * @param {string} mbUrl - string to checking
 *
 * @returns {URL | null} - is the string a URL
 *
 *
 * */

export const checkUrl = (mbUrl: string) => {
  try {
    return new URL(mbUrl);
  } catch (error) {
    return null;
  }
};
