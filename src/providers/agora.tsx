"use client";

import { env } from "@/env";
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTM, { createClient } from "agora-rtm-react";
import { type ReactNode } from "react";

const APP_ID = env.NEXT_PUBLIC_AGORA_APP_ID;
export const useRtmClient = createClient(APP_ID);

// set agora log level to display warning and errors
AgoraRTC.setLogLevel(2);
AgoraRTM.LOG_FILTER_INFO;

// create agora provider to use agora-react
const AgoraProvider = ({ children }: { children: ReactNode }) => {
  const rtcClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
  const agoraClient = useRTCClient(rtcClient); // create RTC client

  return <AgoraRTCProvider client={agoraClient}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
