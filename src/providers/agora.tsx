import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { type ReactNode } from "react";

const AgoraProvider = ({ children }: { children: ReactNode }) => {
  const rtcClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
  const agoraClient = useRTCClient(rtcClient);

  return <AgoraRTCProvider client={agoraClient}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
