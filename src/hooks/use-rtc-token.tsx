import { api } from "@/trpc/react";
import { useRTCClient } from "agora-rtc-react";
import { useEffect } from "react";

const useRtcToken = ({ channelName }: { channelName: string }) => {
  const rtcClient = useRTCClient();
  const { uid } = rtcClient;
  const { isLoading, isError, data, error, mutate } =
    api.agora.generateToken.useMutation();

  useEffect(() => {
    if (uid) {
      mutate({ channelName, uid: uid.toString(), role: "publisher" });
    }
  }, []);

  if (!isLoading && isError) {
    return { isLoading, error };
  }

  return { isLoading, data };
};

export default useRtcToken;
