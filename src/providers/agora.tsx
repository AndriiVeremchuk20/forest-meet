"use client";

import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { type ReactNode} from "react";

// create agora provider to use agora-react
const AgoraProvider = ({ children }: { children: ReactNode }) => {
  const rtcClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
  const agoraClient = useRTCClient(rtcClient); // create RTC client

  return <AgoraRTCProvider client={agoraClient}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
