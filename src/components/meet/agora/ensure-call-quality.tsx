import { useNetworkStatus } from "@/hooks/agora";
import {
  type ILocalVideoTrack,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";

import { useRef, type FC, type ReactNode, useEffect, useState } from "react";
import BadConnection from "../bad-connection";

interface CallQualityProps {
  children: ReactNode;
  localCameraTrack: ILocalVideoTrack | null;
}

//https://docs.agora.io/en/video-calling/reference/channel-management-rest-api?platform=react-js#online-channel-statistics-query
export const EnsureCallQuality: FC<CallQualityProps> = ({
  children,
  localCameraTrack,
}) => {
  const networkQuality = useNetworkStatus();
  const rtcClient = useRTCClient();
  const remoteUsers = useRemoteUsers();

  const [isHighRemoteVideoQuality, setVideoQualityState] =
    useState<boolean>(false);
  const enabledFeatures = useRef<boolean>(false);

  useEffect(() => {
    if (!enabledFeatures.current) {
      callQualityEssentials()
        .then(() => console.log("Call quality features enabled"))
        .catch((error) => console.error(error));
      enabledFeatures.current = true;
    }
   // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (networkQuality.code >= 3) {
      setVideoQualityState(true);
    } else {
      setVideoQualityState(false);
    }
  }, [networkQuality]);

  useEffect(() => {
    setRemoteVideoQuality();
	 // eslint-disable-next-line
  }, [isHighRemoteVideoQuality]);

  const callQualityEssentials = async () => {
    try {
      await rtcClient.enableDualStream();
    } catch (error) {
      //console.log(error);
    }
    await localCameraTrack?.setEncoderConfiguration({
      width: 640,
      height: { ideal: 480, min: 400, max: 500 },
      frameRate: 15,
      bitrateMin: 500,
      bitrateMax: 1000,
    });
  };

  const setRemoteVideoQuality = () => {
    if (remoteUsers.length === 0) {
      console.log("No remote users in the channel");
      return;
    }

    const newQualityState = !isHighRemoteVideoQuality;
    const streamType = newQualityState ? 0 : 1;

    remoteUsers.forEach((remoteUser) => {
      rtcClient
        .setRemoteVideoStreamType(remoteUser.uid, streamType)
        .then(() => setVideoQualityState(newQualityState))
        .catch((error) => console.error(error));
    });
  };

  if (networkQuality.code >= 3) {
    return <BadConnection />;
  }

  return <>{children}</>;
};
