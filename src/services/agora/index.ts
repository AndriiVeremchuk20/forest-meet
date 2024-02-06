import { env } from "@/env";
import ky from "ky";
import type {
  ChannelInfoResponse,
  KickUserChannelResponse,
  Privileges,
} from "./types";

/*
 * Usage Agora REST API
 *
 * 1. To get channel info: (https://api.agora.io/dev/v1/channel/user/{appId}/{channel_name})
 * 2. To kick user in channel: (https://api.agora.io/dev/v1/kicking-rule)
 *
 */

const BASE_URL = "http://api.agora.io/dev/v1/";

const { NEXT_PUBLIC_AGORA_APP_ID: APP_ID, AGORA_KEY, AGORA_SECRET } = env;
const credential = `${AGORA_KEY}:${AGORA_SECRET}`;
const AuthorizationHeader = `Basic ${btoa(credential)}`; // convert crredential to base-64

const AgoraApiClient = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    "content-type": "application/json",
    Authorization: AuthorizationHeader,
  },
});

export const getChannelInfo = async (cname: string) => {
  const queryString = ["channel/user", APP_ID, cname].join("/");
  try {
    const channelInfo =
      await AgoraApiClient.get(queryString).json<ChannelInfoResponse>();
    return channelInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const kickUserInChannel = async ({
  uid,
  cname,
  privileges,
}: {
  uid: number;
  cname: string;
  privileges: Privileges[];
}) => {
  const path = "kicking-rule";

  try {
    const response = await AgoraApiClient.post(path, {
      body: JSON.stringify({
        appid: APP_ID,
        uid,
        cname,
        privileges,
        time: 60,
      }),
    }).json<KickUserChannelResponse>();

    console.log(response);
    return response.status === "success";
  } catch (error) {
    console.log(error);
    console.log("Error kick user privileges");

    return false;
  }
};
