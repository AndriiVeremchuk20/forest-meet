import { env } from "@/env";
import { RtcRole, RtcTokenBuilder } from "agora-token";

interface GenerateTokenByUidParams {
  channelName: string;
  uid: number;
  expireTime: number;
}

export const generateAgoraRtcTokenByUid = ({
  channelName,
  uid,
  expireTime,
}: GenerateTokenByUidParams) => {
  // get agora project credentials from env
  const appId = env.NEXT_PUBLIC_AGORA_APP_ID;
  const appCertificate = env.AGORA_APP_CERTIFICATE;

  //calculate privilege expire time
  const currentTime: number = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  // generate token by uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    expireTime,
    privilegeExpireTime,
  );

  return {
    token,
  };
};