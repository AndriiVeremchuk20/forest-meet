import { env } from "@/env";
import type {
  ChannelInfoResponse,
  KickUserChannelResponse,
  Privileges,
} from "./types";
import AgoraApiClient from "./client";

/*
 * Usage Agora REST API
 *
 * 1. To get channel info: (https://api.agora.io/dev/v1/channel/user/{appId}/{channel_name})
 * 2. To kick user in channel: (https://api.agora.io/dev/v1/kicking-rule)
 *
 */

const { NEXT_PUBLIC_AGORA_APP_ID: APP_ID } = env;

/*
 * The function returned channel info such as (channel_exist, users, total users in channel)
 *
 * @param {string} chame - The name of agora channel
 *
 * @returns {Object} - An object representing the response.
 *  @property {boolean} success - Indicates if the operation was successful.
 *  @property {Object} data - The data object containing additional information.
 *    @property {boolean} channel_exist - Indicates if the channel exists.
 *    @property {boolean} mode - The mode.
 *    @property {number} total - The total count.
 *    @property {number[]} users - An array containing user IDs.
 *
 * */
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

/*
 * The function to kick user privileges
 *
 * @params {Object} params - The object contain parameters to kick user privilege
 *   @param {number} params.uid - The user UID
 *   @param {string} params.cname - The channel name
 *   @param {Privileges[]} params.privileges - An array of privileges.
 *
 * @returns {boolean} - The operation was successfully completed
 *
 * */
export const kickUserPrivileges = async ({
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

const AgoraApi = {
  getChannelInfo,
  kickUserPrivileges,
};

export default AgoraApi;
