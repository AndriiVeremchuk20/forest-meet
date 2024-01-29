"use client";

import React, { useState, useEffect, type FC } from "react";
import { NextImage } from "../common";
import {
  LocalVideoTrack,
  type IAgoraRTCRemoteUser,
  type ICameraVideoTrack,
  useVolumeLevel,
  RemoteUser,
} from "agora-rtc-react";
import parseVolumeLevel from "@/utils/parse-volume-level";

type ComponentCss = {
  radius: string;
  rotate: number;
  rotateReverse: number;
};

interface SquareProps {
  css: {
    radius: string;
    rotate: number;
    rotateReverse: number;
  };
  num: number;
}

const Square: React.FC<SquareProps> = ({ css, num }) => {
  return (
    <div
      className="square"
      style={{
        transform: `rotate(${css.rotate}deg) translate(${css.radius}px) rotate(${css.rotateReverse}deg)`,
      }}
    >
      {num}
    </div>
  );
};

interface LocalUserPlayerProps {
  cameraTrack: ICameraVideoTrack | null;
  css: ComponentCss;
}

const LocalUserPlayer: FC<LocalUserPlayerProps> = ({ cameraTrack, css }) => {
  return (
    <div
      style={{
        transform: `rotate(${css.rotate}deg) translate(${css.radius}px) rotate(${css.rotateReverse}deg)`,
      }}
      className="square border-[5px] border-red-800 backdrop-blur-md"
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
        <NextImage src="/user.png" width={200} className="bg-neutral-500" />
      )}
      <RemoteUser
        user={user}
        playVideo={true}
        playAudio={true}
        className={`${!hasVideo ? "hidden" : "block"}`}
      />
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
    const { desktop, laptop, tablet, phone } = screenSizeConfig;
    const windowWidth = window.innerWidth;

    if (windowWidth <= phone) return "100";
    if (windowWidth <= tablet) return "150";
    if (windowWidth <= laptop) return "180";
    return "230";
  });

  const [localUserWithCss, setLocalUserWithCss] = useState<ComponentCss>({
    radius,
    rotate: -90,
    rotateReverse: 90,
  });
  const [remoteUsersPosition, setRemoteUsersPosition] = useState<
    Array<{ user: IAgoraRTCRemoteUser; css: ComponentCss }>
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
      }
	  else {
      items.push({
	  user: remoteUsers[i-1]!,
	  css: {
        radius: r,
        rotate: rotate,
        rotateReverse: rotateReverse,
      }});}
    }
    setRemoteUsersPosition(items);
  };

  const handleResize = () => {
    setRadius(() => {
      const { desktop, laptop, tablet, phone } = screenSizeConfig;
      const windowWidth = window.innerWidth;

      if (windowWidth <= phone) return "100";
      if (windowWidth <= tablet) return "150";
      if (windowWidth <= laptop) return "180";
      return "230";
    });

    buildCircle();
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
  }, [remoteUsers, localUserCameraTrack]);

  return (
    <div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <NextImage
          src={"/fire.gif"}
          className="phone:w-[200px] tablet:w-[250px] desktop:w-[300px] "
        />
      </div>
      <div className="circle">
        <div className="circle-hold">
          <LocalUserPlayer
            cameraTrack={localUserCameraTrack}
            css={localUserWithCss}
          />
          {remoteUsersPosition.map(({user, css}, index) => (
            <RemoteUserPlayer
              key={index}
              user={user}
              css={css}
              name="dd"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersAroundFire;
