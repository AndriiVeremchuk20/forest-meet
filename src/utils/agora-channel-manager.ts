import { env } from "@/env";
import { RtcRole, RtcTokenBuilder, RtmTokenBuilder } from "agora-token";
import { generate } from "random-words";

const {
  NEXT_PUBLIC_AGORA_APP_ID: APP_ID,
  AGORA_APP_CERTIFICATE: APP_CERTIFICATE,
} = env;

/*
 * The function to generate channel names
 *
 * @returns {string} - The generated channel name
 */
const generateChannelName = () => {
  const words = generate(5) as string[];

  return words.join("-");
};

/*
 * The function to generate user UID in 32 bit numbers
 *
 * @returns {number} random 32 bit number UID
 */
const generateUid = () => {
  const minValue = 1;
  const maxValue = Math.pow(2, 32) - 1;

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

/*
 * The function to generate Agora RTC token
 * @params {object} - An object containing parameters for generating the token
 *	@param {number} uid - The user UID
 *	@param {string} channelName - The name of channel
 *	@param {string} expireTime - The exparition time of the token in a seconds
 *
 *	@returns {string} - The generated RTC token
 * */
const generateRtcToken = ({
  uid,
  channelName,
  expireTime,
}: {
  uid: number;
  channelName: string;
  expireTime: number;
}) => {
  //calculate privilege expire time
  const currentTime: number = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  // generate token by uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    expireTime,
    privilegeExpireTime,
  );

  return token;
};

/*
 * The function to generate Agora RTM token
 * @params {object} - An object containing parameters for generating the token
 *	@param {number} uid - The user UID
 *	@param {string} expireTime - The exparition time of the token in a seconds
 *
 *	@returns {string} - The generated RTM token
 * */
const generateRtmToken = ({
  uid,
  expireTime,
}: {
  uid: string;
  expireTime: number;
}) => {
  // generate rtm token
  const token = RtmTokenBuilder.buildToken(
    APP_ID,
    APP_CERTIFICATE,
    uid,
    expireTime,
  );

  return token;
};

const AgoraChannelManager = {
  generateRtcToken,
  generateRtmToken,
  generateUid,
  generateChannelName,
};

export default AgoraChannelManager;
