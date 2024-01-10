import { useClientEvent, useRTCClient } from "agora-rtc-react";

const useTokenWillExpire = () => {
  const rtcClient = useRTCClient();

  // useClientEvent(rtcClient, "token-privilege-will-expire");
};

export default useTokenWillExpire;
