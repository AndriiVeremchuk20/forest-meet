"use client";
import { env } from "@/env";
import { LocalVideoTrack, useJoin, useLocalCameraTrack } from "agora-rtc-react";
import { useEffect } from "react";

export const UserPreview = () => {
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

  useJoin({
    appid: env.NEXT_PUBLIC_AGORA_APP_ID,
    token: env.NEXT_PUBLIC_AGORA_TOKEN,
    channel: env.NEXT_PUBLIC_AGORA_CHANNEL,
  });

  useEffect(() => {
    return () => {
      localCameraTrack?.close();
    };
  }, []);

  return (
    <div className="h-[500px] w-[400px]">
      {isLoadingCam ? (
        <div>Loading</div>
      ) : (
        <LocalVideoTrack track={localCameraTrack} play={true} />
      )}
    </div>
  );
};
