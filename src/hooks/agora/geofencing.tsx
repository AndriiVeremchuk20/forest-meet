import AgoraRTC, { AREAS } from "agora-rtc-sdk-ng";
import { useEffect } from "react";

export const useGeofencing = () => {
  useEffect(() => {
    AgoraRTC.setArea({ areaCode: [AREAS.NORTH_AMERICA, AREAS.EUROPE] });
  }, []);
};
