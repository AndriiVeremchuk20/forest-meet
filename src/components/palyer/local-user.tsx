import { LocalVideoTrack, type ICameraVideoTrack } from "agora-rtc-react";
import { type FC } from "react";

interface LocalUserPlayerProps {
  cameraTrack: ICameraVideoTrack | null;
}

const LocalUserPlayer: FC<LocalUserPlayerProps> = ({ cameraTrack }) => {
  return (
    <div className="h-[200px] w-[200px]">
      <LocalVideoTrack track={cameraTrack} play={true} />
    </div>
  );
};

export default LocalUserPlayer;
