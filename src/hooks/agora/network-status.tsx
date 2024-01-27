import { useNetworkQuality } from "agora-rtc-react";

const networkLabels = {
  0: "unknown",
  1: "excellent",
  2: "good",
  3: "poor",
  4: "bad",
  5: "very bad",
  6: "no connection",
};

export const useNetworkStatus = () => {
  const networkQuality = useNetworkQuality();

  return {
    code: networkQuality.uplinkNetworkQuality,
    message: networkLabels[networkQuality.uplinkNetworkQuality],
  };
};
