import { env } from "@/env";
import { RtcRole, RtcTokenBuilder } from "agora-token";

interface GenerateTokenByUidParams {
  channelName: string;
  uid: number;
  role: "publisher" | "audience";
  expireTime: number;
}

export const generateAgoraTokenByUid = ({
  channelName,
  uid,
  role,
  expireTime,
}: GenerateTokenByUidParams) => {
  // get agora project credentials from env
  const appId = env.NEXT_PUBLIC_AGORA_APP_ID;
  const appCertificate = env.AGORA_APP_CERTIFICATE;

  //calculate privilege expire time
  const currentTime: number = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  // convert role to RtcRole
  const rtcRole = role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  // generate token by uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    rtcRole,
    expireTime,
    privilegeExpireTime,
  );

  return {
    token,
  };
};
