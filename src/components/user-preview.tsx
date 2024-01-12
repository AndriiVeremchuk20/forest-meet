"use client";
import { env } from "@/env";
import {
  LocalVideoTrack,
  useAutoPlayVideoTrack,
  useJoin,
  useLocalCameraTrack,
} from "agora-rtc-react";
import { useEffect, useRef, useState } from "react";

export const UserPreview = () => {
  const [m, setM] = useState(false);
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

  useJoin({
    appid: env.NEXT_PUBLIC_AGORA_APP_ID,
    token: env.NEXT_PUBLIC_AGORA_TOKEN,
    channel: env.NEXT_PUBLIC_AGORA_CHANNEL,
  });

  useEffect(() => {
    setM(true);
    return () => {
      localCameraTrack?.close();
    };
  }, []);

  if (!m) return <div>Loading</div>;

  return (
    <div className="h-[500px] w-[400px] bg-neutral-400">
      {isLoadingCam ? (
        <div>Loading</div>
      ) : (
        <LocalVideoTrack play={true} track={localCameraTrack} />
      )}
    </div>
  );
};
