//import { useUserMediaStore } from "@/store/user-media";
import {
  type IMicrophoneAudioTrack,
  type ICameraVideoTrack,
} from "agora-rtc-react";
import { useState } from "react";

export const ToggleVideoButton = ({
  track,
}: {
  track: ICameraVideoTrack | null;
}) => {
  const [video, setVideo] = useState<boolean>(true);
  //const {media, setVideo} = useUserMediaStore();

  const handleClick = async () => {
    await track?.setEnabled(!video);
    setVideo((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-blue-800 px-3 py-2 text-white`}
    >
      Video
    </button>
  );
};

export const ToggleAudioButton = ({
  track,
}: {
  track: IMicrophoneAudioTrack | null;
}) => {
  const [audio, setAudio] = useState<boolean>(true);

  const handleClick = async () => {
    await track?.setEnabled(!audio);
    setAudio((prev) => !prev);
  };
  return (
    <button onClick={handleClick} className="bg-blue-800 px-3 py-2 text-white">
      Audio
    </button>
  );
};
