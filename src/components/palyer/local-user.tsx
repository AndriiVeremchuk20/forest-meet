import {
  LocalVideoTrack,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { type FC } from "react";

interface LocalUserPlayerProps {
  cameraTrack: ICameraVideoTrack | null;
  audioTrack: IMicrophoneAudioTrack | null;
}

const LocalUserPlayer: FC<LocalUserPlayerProps> = ({
  cameraTrack,
  audioTrack,
}) => {
  if (!cameraTrack?.enabled) {
    return (
      <div className="h-[200px] w-[200px] bg-red-600">
        {audioTrack?.enabled ? "With audio" : "No audio"}
      </div>
    );
  }

  return (
    <div className="h-[200px] w-[200px]">
      {audioTrack ? "With audio" : "No audio"}
      <LocalVideoTrack track={cameraTrack} play={true} />
    </div>
  );
};

export default LocalUserPlayer;
