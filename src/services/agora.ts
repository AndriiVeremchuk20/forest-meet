import { env } from "@/env";
import ky from "ky";

/*
 * Usage Agora REST API
 *
 * 1. To get channel info: (https://api.agora.io/dev/v1/channel/user/{appId}/{channel_name})
 *
 *
 */

const BASE_URL = "http://api.agora.io/dev/v1/";
const { AGORA_KEY, AGORA_SECRET } = env;
const credential = `${AGORA_KEY}:${AGORA_SECRET}`;

const AuthorizationHeader = `Basic ${btoa(credential)}`; // convert crredential to base-64

const AgoraApiClient = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    "content-type": "application/json",
    Authorization: AuthorizationHeader,
  },
});

/*
 *{
  success: true,
  data: { channel_exist: true, mode: 1, total: 1, users: [ 10502 ] }
}
* */

interface ChannelInfoResponse {
  success: boolean;
  data: {
    channel_exist: true;
    mode: boolean;
    total: number;
    users: number[];
  };
}

export const getChannelInfo = async (channelName: string) => {
  const AppId = env.NEXT_PUBLIC_AGORA_APP_ID;
  const queryString = ["channel/user", AppId, channelName].join("/");
  try {
    const channelInfo =
      await AgoraApiClient.get(queryString).json<ChannelInfoResponse>();
    return channelInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};
