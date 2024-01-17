"use client";

import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import { type ReactNode } from "react";

// create agora provider to use agora-react
const AgoraProvider = ({ children }: { children: ReactNode }) => {
  const rtcClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
  const agoraClient = useRTCClient(rtcClient); // create RTC client
  //agoraClie
  //rtcClient.enableAudioVolumeIndicator();
  //AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
  //rtcClient.enableAudioVolumeIndicator();

  return <AgoraRTCProvider client={agoraClient}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
