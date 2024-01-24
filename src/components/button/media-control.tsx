import {
  CameraOffIcon,
  CameraOnIcon,
  MicroOffIcon,
  MicroOnIcon,
} from "../icons";
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
      {!enabledCamera ? (
        <CameraOnIcon width={70} className="h-[40px]" />
      ) : (
        <CameraOffIcon width={70} className="h-[40px]" />
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
      {!enabledMicro ? (
        <MicroOnIcon className="h-[40px]" />
      ) : (
        <MicroOffIcon className="h-[40px]" />
      )}
    </button>
  );
};
