import { type IAgoraRTCRemoteUser, RemoteUser } from "agora-rtc-react";
import { type FC } from "react";

interface RemoteUserPlayerProps {
  user: IAgoraRTCRemoteUser;
}
const RemoteUserPlayer: FC<RemoteUserPlayerProps> = ({ user }) => {
  if (!user.hasVideo) {
    return (
      <div className="h-[200px] w-[200px] bg-neutral-500">
        {!user.hasAudio && (
          <div className="bg-neutral-700 text-white">No audio</div>
        )}
        No video
      </div>
    );
  }

  return (
    <div className="h-[200px] w-[200px]">
      {!user.hasAudio && (
        <div className="bg-neutral-700 text-white">No audio</div>
      )}
      <RemoteUser
        user={user}
        playVideo={true}
        playAudio={true}
        className="border-[5px] border-red-900"
      />
    </div>
  );
};

export default RemoteUserPlayer;
