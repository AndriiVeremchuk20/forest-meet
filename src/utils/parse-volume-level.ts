/*
 * Returns the parsed volume level
 *
 * @prams {number} volume - The volume level (got from useVolumeLevel Agora rtc)
 * @returns {number} - The rounded volume value increased by 100 times
 *
 */

const parseVolumeLevel = (volume: number) => {
  return Math.floor(volume * 100);
};

export default parseVolumeLevel;
