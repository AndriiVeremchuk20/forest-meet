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

  const handleClick = () => {
    track
      ?.setEnabled(!camera)
      .then(() => setCamera((prev) => !prev))
      .catch((error) => console.log(error));
    //await track?.setEnabled(!camera);
  };
  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2 text-white hover:opacity-80`}
    >
      {camera ? (
        <CameraOnIcon width={70} className="h-[40px]" />
      ) : (
        <CameraOffIcon width={70} className="h-[40px]" />
      )}
    </button>
  );
};

export const ToggleAudioButton = ({
  track,
}: {
  track: IMicrophoneAudioTrack | null;
}) => {
  const [microphone, setMicrophone] = useState<boolean>(!!track?.muted);

  const handleClick = async () => {
    await track?.setMuted(!microphone);
    setMicrophone((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className="w-fit px-3 py-2 text-white hover:opacity-80"
    >
      {!microphone ? (
        <MicroOnIcon className="h-[40px]" />
      ) : (
        <MicroOffIcon className="h-[40px]" />
      )}
    </button>
  );
};
