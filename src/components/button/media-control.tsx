import {
  type IMicrophoneAudioTrack,
  type ICameraVideoTrack,
} from "agora-rtc-react";
import {
  CameraOffIcon,
  CameraOnIcon,
  MicroOffIcon,
  MicroOnIcon,
} from "../icons";
import { useState } from "react";

export const ToggleVideoButton = ({
  track,
}: {
  track: ICameraVideoTrack | null;
}) => {
  const [camera, setCamera] = useState<boolean>(!!track?.enabled);

  const handleClick = async () => {
    await track?.setEnabled(!camera);
    setCamera((prev) => !prev);
  };
  return (
    <button onClick={handleClick} className={`px-3 py-2 text-white`}>
      {camera ? <CameraOnIcon width={70} /> : <CameraOffIcon width={70} />}
    </button>
  );
};

export const ToggleAudioButton = ({
  track,
}: {
  track: IMicrophoneAudioTrack | null;
}) => {
  const [microphone, setMicrophone] = useState<boolean>(!!track?.enabled);

  const handleClick = async () => {
    await track?.setEnabled(!microphone);
    setMicrophone((prev) => !prev);
  };

  return (
    <button onClick={handleClick} className="px-3 py-2 text-white">
      {microphone ? <MicroOnIcon /> : <MicroOffIcon />}
    </button>
  );
};
