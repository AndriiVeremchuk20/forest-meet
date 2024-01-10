"use client";
import { env } from "@/env";
import {
  LocalVideoTrack,
  useAutoPlayVideoTrack,
  useJoin,
  useLocalCameraTrack,
} from "agora-rtc-react";
import { useEffect, useRef } from "react";

export const UserPreview = () => {
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  //const divRef = useRef<HTMLDivElement | null>(null);
  //useAutoPlayVideoTrack(localCameraTrack, true, divRef.current);

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
    <div className="h-[500px] w-[400px] bg-neutral-400">
      {isLoadingCam ? (
        <div>Loading</div>
      ) : (
        <LocalVideoTrack play={true} track={localCameraTrack} />
      )}
    </div>
  );
};
