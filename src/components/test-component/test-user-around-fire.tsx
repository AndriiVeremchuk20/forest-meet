"use client";

import React, { useState, useEffect, type FC } from "react";
import { NextImage } from "../common";

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
  const dynamicStyle = {
    transform: `rotate(${css.rotate}deg) translate(${css.radius}px) rotate(${css.rotateReverse}deg)`,
  };

  return (
    <div
      className={`absolute left-0 h-[100px] w-[100px] transform bg-red-500 text-white  transition-all duration-1000 ease-linear laptop:h-[120px] laptop:w-[120px]`}
      style={dynamicStyle}
    >
      <div className="absolute right-1">N</div>
      {num}
    </div>
  );
};

type RemoteUserWithPositionType = {
  radius: string;
  rotate: number;
  rotateReverse: number;
};

const screenSizeConfig = {
  phone: 375,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
};

const TestUsersAroundFire: FC = ({}) => {
  const calculateRadius = () => {
    const { laptop, tablet, phone } = screenSizeConfig;
    const windowWidth = window.innerWidth;

    if (windowWidth <= phone) return "100";
    if (windowWidth <= tablet) return "150";
    if (windowWidth <= laptop) return "180";
    return "230";
  };

  const [radius, setRadius] = useState<string>(calculateRadius());

  const [localUserWithCss, setLocalUserWithCss] = useState<ComponentCss>({
    radius,
    rotate: -90,
    rotateReverse: 90,
  });
  const [remoteUsersPosition, setRemoteUsersPosition] = useState<
    Array<ComponentCss>
  >([]);

  const buildCircle = () => {
    const num = 7 + 1; //remote users + local user
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
          radius: r,
          rotate: rotate,
          rotateReverse: rotateReverse,
        });
      }
    }
    setRemoteUsersPosition(items);
  };

  const handleResize = () => {
    setRadius(calculateRadius());
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
  }, [radius]);

  return (
    <div>
      <div className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 transform">
        <NextImage
          src={"/campfire.gif"}
          className="phone:w-[100px] tablet:w-[150px] desktop:w-[200px] "
        />
      </div>
      <div className="relative mx-auto my-[40px] h-[500px] w-[500px] rounded-full">
        <div className="absolute left-[200px] top-[180px]">
          <Square css={localUserWithCss} num={-10} />
          {remoteUsersPosition.map((value, index) => {
            return <Square css={value} key={index} num={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TestUsersAroundFire;
