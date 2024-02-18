import {
  CameraOffIcon,
  CameraOnIcon,
  MicrophoneOffIcon,
  MicrophoneOnIcon,
} from "../svgs";
import { useMediaControlStore } from "@/store";

export const ToggleCameraButton = () => {
  const { enabledCamera } = useMediaControlStore();

  const handleClick = () => {
    useMediaControlStore.setState((prev) => ({
      ...prev,
      enabledCamera: !prev.enabledCamera,
    }));
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2 text-white hover:opacity-50`}
    >
      {enabledCamera ? (
        <CameraOnIcon className="h-[40px] w-[60px]" />
      ) : (
        <CameraOffIcon className="h-[40px] w-[60px]" />
      )}
    </button>
  );
};

export const ToggleAudioButton = () => {
  const { enabledMicro } = useMediaControlStore();

  const handleClick = () => {
    useMediaControlStore.setState((prev) => ({
      ...prev,
      enabledMicro: !prev.enabledMicro,
    }));
  };

  return (
    <button
      onClick={handleClick}
      className="w-fit px-3 py-2 text-white hover:opacity-50"
    >
      {enabledMicro ? (
        <MicrophoneOnIcon className="h-[40px] w-[40px]" />
      ) : (
        <MicrophoneOffIcon className="h-[40px] w-[40px]" />
      )}
    </button>
  );
};
