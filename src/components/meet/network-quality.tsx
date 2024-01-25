import { useNetworkQuality } from "agora-rtc-react";

export const NetworkQuality = () => {
  const networkQuality = useNetworkQuality();

  const updateNetworkStatus = () => {
    const networkLabels = {
      0: "unknown",
      1: "excellent",
      2: "good",
      3: "poor",
      4: "bad",
      5: "very Bad",
      6: "no connection",
    };

    return (
      <label>
        Network Quality: {networkLabels[networkQuality.uplinkNetworkQuality]}
      </label>
    );
  };

  return (
    <div className="flex w-full justify-center">{updateNetworkStatus()}</div>
  );
};
