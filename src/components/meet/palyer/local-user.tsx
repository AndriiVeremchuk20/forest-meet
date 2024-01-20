import { LocalVideoTrack, type ICameraVideoTrack } from "agora-rtc-react";
import { type FC } from "react";

interface LocalUserPlayerProps {
  cameraTrack: ICameraVideoTrack | null;
}

const LocalUserPlayer: FC<LocalUserPlayerProps> = ({ cameraTrack }) => {
  return (
    <div className="h-[200px] w-[200px] border-[5px] border-red-800 backdrop-blur-md">
      <LocalVideoTrack track={cameraTrack} play={true} />
      <div className="bg-slate-600">{cameraTrack?.muted ? "No video" : ""}</div>
      <div>You</div>
    </div>
  );
};

export default LocalUserPlayer;
