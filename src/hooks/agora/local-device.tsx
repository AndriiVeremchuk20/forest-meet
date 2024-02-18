"use client";
import { useMediaControlStore } from "@/store";
import { useLocalCameraTrack, useLocalMicrophoneTrack } from "agora-rtc-react";
import { useEffect } from "react";

export const useLocalDevice = () => {
  // getting local camera & microphone tracks
  const { isLoading: isLoadingCamera, localCameraTrack } =
    useLocalCameraTrack();
  const { isLoading: isLoadingMicrophone, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const isLoading = isLoadingCamera || isLoadingMicrophone;

  return {
    isLoading,
    localCameraTrack,
    localMicrophoneTrack,
  };
};
