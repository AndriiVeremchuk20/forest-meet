import { useRtmClient } from "@/providers/agora";
import { createChannel } from "agora-rtm-react";

export const useRtmChannel = ({ channelName }: { channelName: string }) => {
  const rtmClient = useRtmClient();
  const cannel = createChannel(channelName);

  return cannel(rtmClient);
};
