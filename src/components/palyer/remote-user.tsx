"use client";

import {
  type IAgoraRTCRemoteUser,
  RemoteUser,
  useVolumeLevel,
} from "agora-rtc-react";
import { useEffect, type FC } from "react";

interface RemoteUserPlayerProps {
  user: IAgoraRTCRemoteUser;
}
const RemoteUserPlayer: FC<RemoteUserPlayerProps> = ({ user }) => {
  const volumeLevel = useVolumeLevel(user.audioTrack);

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
    <div
      className={`h-full w-full  ${Math.floor(volumeLevel * 100) > 10 ? "shadow-xl" : Math.floor(volumeLevel * 100) > 30 ? "shadow-2xl" : ""} border-red-500 shadow-pink-500`}
    >
      <div className="bg-red-300">{(volumeLevel * 100).toFixed()}</div>
      {!user.hasAudio && (
        <div className="bg-neutral-700 text-white">No audio</div>
      )}
      <RemoteUser
        user={user}
        playVideo={true}
        playAudio={true}
        className="border-[5px] border-red-900"
      />
      <div>User name</div>
    </div>
  );
};

export default RemoteUserPlayer;
