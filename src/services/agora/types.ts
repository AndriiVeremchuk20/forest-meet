export type Privileges = "join_channel" | "publish_audio" | "publish_video";

export interface ChannelInfoResponse {
  success: boolean;
  data: {
    channel_exist: true;
    mode: boolean;
    total: number;
    users: number[];
  };
}

export interface KickUserChannelResponse {
  status: "success" | "error";
  id: number;
}
