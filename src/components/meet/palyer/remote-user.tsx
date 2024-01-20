"use client";

import parseVolumeLevel from "@/utils/parse-volume-level";
import {
  type IAgoraRTCRemoteUser,
  RemoteUser,
  useVolumeLevel,
} from "agora-rtc-react";
import { type FC } from "react";

interface RemoteUserPlayerProps {
  user: IAgoraRTCRemoteUser;
  name: string;
}

const RemoteUserPlayer: FC<RemoteUserPlayerProps> = ({ user, name }) => {
  const volumeLevel = useVolumeLevel(user.audioTrack);

  const {hasAudio, hasVideo} = user;

  return (
    <div
      className={`border-[5px] bg-neutral-400 ${hasAudio && parseVolumeLevel(volumeLevel) > 10 ? "border-green-500" : "border-orange-900"}`}
    >
      <div>{!hasAudio && "No audio"}</div>
      <div>{!hasVideo && "No video"}</div>
      <div className="h-[200px] w-[200px]">
        <RemoteUser user={user} playVideo={true} playAudio={true} />
      </div>
      <div className="bg-blue-600 text-white">{name}</div>
    </div>
  );
};

export default RemoteUserPlayer;
