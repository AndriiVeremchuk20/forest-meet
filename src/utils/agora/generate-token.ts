import { env } from "@/env";
import { RtcRole, RtcTokenBuilder, RtmTokenBuilder } from "agora-token";

// get agora project credentials from env
const APP_ID = env.NEXT_PUBLIC_AGORA_APP_ID;
const APP_CERTIFICATE = env.AGORA_APP_CERTIFICATE;

interface GenerateRtcTokenParams {
  uid: number;
  channelName: string;
  expireTime: number;
}

const generateRtcToken = ({
  uid,
  channelName,
  expireTime,
}: GenerateRtcTokenParams) => {
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

const generateRtmToken = ({
  uid,
  expireTime,
}: {
  uid: string;
  expireTime: number;
}) => {
  //calculate privilege expire time
  //const currentTime: number = Math.floor(Date.now() / 1000);
  //const privilegeExpireTime = currentTime + expireTime;

  // generate rtm token
  const token = RtmTokenBuilder.buildToken(
    APP_ID,
    APP_CERTIFICATE,
    uid,
    expireTime,
  );

  return token;
};

const AgoraTokenGenerator = {
  rtc: generateRtcToken,
  rtm: generateRtmToken,
};

export default AgoraTokenGenerator;
