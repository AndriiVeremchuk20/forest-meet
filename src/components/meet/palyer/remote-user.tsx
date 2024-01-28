"use client";

import Image from "next/image";
import parseVolumeLevel from "@/utils/parse-volume-level";
import {
  type IAgoraRTCRemoteUser,
  RemoteUser,
  useVolumeLevel,
} from "agora-rtc-react";
import { useState, type FC, useEffect } from "react";

interface RemoteUserPlayerProps {
  user: IAgoraRTCRemoteUser;
  name: string;
  css: {
    radius: string;
    rotate: number;
    rotateReverse: number;
  };
}

const RemoteUserPlayer: FC<RemoteUserPlayerProps> = ({ user, name, css }) => {
  const volumeLevel = useVolumeLevel(user.audioTrack);
  const { hasAudio, hasVideo } = user;

  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);

  useEffect(() => {
    if (hasAudio && parseVolumeLevel(volumeLevel) > 20) {
      return setIsSpeaker(true);
    }

    setIsSpeaker(false);
  }, [volumeLevel, hasAudio]);

  return (
    <div
      className={`square border-[5px] bg-neutral-400 ${isSpeaker ? "border-green-600" : "border-orange-900"}`}
      style={{
        transform: `rotate(${css.rotate}deg) translate(${css.radius}px) rotate(${css.rotateReverse}deg)`,
      }}
    >
      {/* !hasAudio && (
        <div className="relative top-0 z-40 bg-orange-900 p-1">Micro off</div>
      )*/}

        {!hasVideo && (
          <Image
            src="/user.png"
            width={200}
            height={200}
            alt="user"
            className="bg-neutral-500"
          />
        )}
        <RemoteUser
          user={user}
          playVideo={true}
          playAudio={true}
          className={`${!hasVideo ? "hidden" : "block"}`}
        />
      {/*<div className="phone:[70px] h-fit break-all bg-blue-600 p-2 text-white desktop:w-[200px]">
        {name}
      </div>*/ }
    </div>
  );
};

export default RemoteUserPlayer;
