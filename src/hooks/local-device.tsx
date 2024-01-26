"use client";
import { useMediaControlStore } from "@/store";
import { useLocalCameraTrack, useLocalMicrophoneTrack } from "agora-rtc-react";
import { useEffect } from "react";

export const useLocalDevice = () => {
  const { enabledMicro, enabledCamera } = useMediaControlStore();

  // get network quality to balancet video quality
  //const networkStatus = useNetworkStatus();

  // getting local camera & microphone tracks
  const { isLoading: isLoadingCamera, localCameraTrack } =
    useLocalCameraTrack();
  const { isLoading: isLoadingMicrophone, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const isLoading = isLoadingCamera || isLoadingMicrophone;

  useEffect(() => {
    localCameraTrack
      ?.setMuted(enabledCamera)
      .catch((error) => console.log(error));
    localMicrophoneTrack
      ?.setMuted(enabledMicro)
      .catch((error) => console.log(error));
  }, [localCameraTrack, localMicrophoneTrack, enabledMicro, enabledCamera]);

  return {
    isLoading,
    localCameraTrack,
    localMicrophoneTrack,
  };
};
