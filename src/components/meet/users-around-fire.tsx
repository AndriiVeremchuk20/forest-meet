"use client";

import React, { useState, useEffect, type FC, memo } from "react";
import { NextImage } from "../common";
import {
  LocalVideoTrack,
  type IAgoraRTCRemoteUser,
  type ICameraVideoTrack,
  useVolumeLevel,
  RemoteUser,
} from "agora-rtc-react";
import parseVolumeLevel from "@/utils/parse-volume-level";
import { ChainSawIcon, MicrophoneOffIcon } from "../svgs";
import { useMeetStore } from "@/store";
import { api } from "@/trpc/react";

type UserCss = {
  radius: string;
  rotate: number;
  rotateReverse: number;
};

interface LocalUserPlayerProps {
  cameraTrack: ICameraVideoTrack | null;
  css: UserCss;
}

const LocalUserPlayer: FC<LocalUserPlayerProps> = ({ cameraTrack, css }) => {
  const dynamicStyle = {
    transform: `rotate(${css.rotate}deg) translate(${css.radius}px) rotate(${css.rotateReverse}deg)`,
  };

  return (
    <div
      style={dynamicStyle}
      className="absolute left-0 h-[100px] w-[100px] transform border-[5px] border-red-800  bg-red-500 text-white backdrop-blur-md transition-all duration-1000 ease-linear laptop:h-[120px] laptop:w-[120px]"
    >
      <LocalVideoTrack track={cameraTrack} play={true} />
    </div>
  );
};

interface RemoteUserPlayerProps {
  user: IAgoraRTCRemoteUser;
  name: string;
  css: {
    radius: string;
    rotate: number;
    rotateReverse: number;
  };
}

const RemoteUserPlayer: FC<RemoteUserPlayerProps> = ({ user, css }) => {
  const dynamicStyle = {
    transform: `rotate(${css.rotate}deg) translate(${css.radius}px) rotate(${css.rotateReverse}deg)`,
  };

  const { hasAudio, hasVideo } = user;
  const { meetCredentials } = useMeetStore();
  const { isCreator, cname, uid } = meetCredentials!;

  const volumeLevel = useVolumeLevel(user.audioTrack);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);

  const kickUserMutations = api.agora.kickUserFromRoom.useMutation();

  const handleKickClick = () => {
    kickUserMutations.mutate({ cname, uid });
  };

  useEffect(() => {
    if (hasAudio && parseVolumeLevel(volumeLevel) > 20) {
      return setIsSpeaker(true);
    }

    setIsSpeaker(false);
  }, [volumeLevel, hasAudio]);

  return (
    <div
      className={`absolute left-0 h-[100px] w-[100px] transform border-[5px]  bg-neutral-400 text-white transition-all duration-1000 ease-linear  laptop:h-[120px] laptop:w-[120px] ${isSpeaker ? "border-green-600" : "border-orange-900"}`}
      style={dynamicStyle}
    >
      {!hasAudio && (
        <div className="absolute right-[-10px] top-[-10px] z-10">
          <MicrophoneOffIcon width={25} />
        </div>
      )}

      {!hasVideo && (
        <NextImage src="/user.png" width={200} className="bg-neutral-500" />
      )}
      <RemoteUser
        user={user}
        playVideo={true}
        playAudio={true}
        className={`${!hasVideo ? "hidden" : "block"}`}
      />
      {/*isCreator && (
        <button onClick={handleKickClick}>
          <ChainSaw className="absolute bottom-3 left-3 z-10 h-[40px] w-[30px]" />
        </button>
      )*/}
    </div>
  );
};

interface UsersAroundFireProps {
  remoteUsers: IAgoraRTCRemoteUser[];
  localUserCameraTrack: ICameraVideoTrack | null;
}

type RemoteUserWithPositionType = {
  user: IAgoraRTCRemoteUser;
  css: {
    radius: string;
    rotate: number;
    rotateReverse: number;
  };
};

const screenSizeConfig = {
  phone: 375,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
};

const UsersAroundFire: FC<UsersAroundFireProps> = ({
  remoteUsers,
  localUserCameraTrack,
}) => {
  const [radius, setRadius] = useState<string>(() => {
    const { laptop, tablet, phone } = screenSizeConfig;
    const windowWidth = window.innerWidth;

    if (windowWidth <= phone) return "100";
    if (windowWidth <= tablet) return "150";
    if (windowWidth <= laptop) return "180";
    return "230";
  });

  const [localUserWithCss, setLocalUserWithCss] = useState<UserCss>({
    radius,
    rotate: -90,
    rotateReverse: 90,
  });
  const [remoteUsersPosition, setRemoteUsersPosition] = useState<
    Array<{ user: IAgoraRTCRemoteUser; css: UserCss }>
  >([]);

  const buildCircle = () => {
    const num = remoteUsers.length + 1; //remote users + local user
    const type = 1;
    const r = radius; //windowWidth <= 375 ? "150" : "250";
    const start = -90;
    const slice = (360 * type) / num;

    const items: Array<RemoteUserWithPositionType> = [];
    for (let i = 0; i < num; i++) {
      const rotate = slice * i + start;
      const rotateReverse = rotate * -1;

      if (i === 0) {
        setLocalUserWithCss({ radius, rotate: -90, rotateReverse: 90 });
      } else {
        items.push({
          user: remoteUsers[i - 1]!,
          css: {
            radius: r,
            rotate: rotate,
            rotateReverse: rotateReverse,
          },
        });
      }
    }
    setRemoteUsersPosition(items);
  };

  const handleResize = () => {
    setRadius(() => {
      const { laptop, tablet, phone } = screenSizeConfig;
      const windowWidth = window.innerWidth;

      if (windowWidth <= phone) return "100";
      if (windowWidth <= tablet) return "150";
      if (windowWidth <= laptop) return "180";
      return "230";
    });
  };

  useEffect(() => {
    buildCircle();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    buildCircle();
    // eslint-disable-line
  }, [remoteUsers, radius]);

  return (
    <div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <NextImage
          src={"/campfire.gif"}
          className="phone:w-[100px] tablet:w-[150px] desktop:w-[200px] "
        />
      </div>
      <div className="relative mx-auto my-[40px] h-[500px] w-[500px] rounded-full">
        <div className="absolute left-[200px] top-[180px]">
          <LocalUserPlayer
            cameraTrack={localUserCameraTrack}
            css={localUserWithCss}
          />
          {remoteUsersPosition.map(({ user, css }, index) => (
            <RemoteUserPlayer key={index} user={user} css={css} name="dd" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(UsersAroundFire);
