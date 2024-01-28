"use client";

import React, { useState, useEffect } from "react";
import { NextImage } from "../common";
import { type IAgoraRTCRemoteUser } from "agora-rtc-react";
import RemoteUserPlayer from "./palyer/remote-user";

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

interface RemoteUsersCircleProps {
  remoteUsers: IAgoraRTCRemoteUser[];
}

type RemoteUserWithPositionType = {
  user: IAgoraRTCRemoteUser;
  css: {
    radius: string;
    rotate: number;
    rotateReverse: number;
  };
};

const RemoteUsersCircle: React.FC<RemoteUsersCircleProps> = ({
  remoteUsers,
}) => {
  const [remoteUserWithPosition, setRemoteUserWithPosition] = useState<
    Array<RemoteUserWithPositionType>
  >([]);

  const buildCircle = () => {
    const num = remoteUsers.length;
    const type = 1;
    const radius = "220";
    const start = -90;
    const slice = (360 * type) / num;

    const items: Array<RemoteUserWithPositionType> = [];
    for (let i = 0; i < num; i++) {
      const rotate = slice * i + start;
      const rotateReverse = rotate * -1;

      if (remoteUsers[i]) {
        items.push({
          user: remoteUsers[i]!,
          css: {
            radius: radius,
            rotate: rotate,
            rotateReverse: rotateReverse,
          },
        });
      }
    }
    setRemoteUserWithPosition(items);
  };

  useEffect(() => {
    // Uncomment the line below if you want to build the circle on load
    buildCircle();
  }, [remoteUsers]);

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
          {remoteUserWithPosition.map(({ user, css }, index) => (
            <RemoteUserPlayer
              key={user.uid}
              user={user}
              name="test"
              css={css}
            />
            //<Square key={index} css={value} num={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemoteUsersCircle;
