"use client"

import React, { FC, useEffect, useState } from "react";

interface RemoteUsersSquareProps {
  // :remoteUsers: IAgoraRTCRemoteUser[]; //number[];
  // :names: Record<number, string>;
}

const RemoteUsersSquare: FC<RemoteUsersSquareProps> = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Обновляем ширину экрана при изменении размера окна
    window.addEventListener("resize", updateScreenWidth);

    // Очищаем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const squareToCartesian = (
    angle: number,
    sizeX: number,
    sizeY: number,
    deviationX: number = 0,
    deviationY: number = 0
  ) => {
    const radians = (angle * Math.PI) / 180;
    const x = (sizeX + deviationX) * Math.cos(radians);
    const y = (sizeY + deviationY) * Math.sin(radians);
    return { x, y };
  };

  const screens = {
    phone: { sizeX: 160, sizeY: 400 },
    tablet: { sizeX: 300, sizeY: 200 },
    laptop: { sizeX: 300, sizeY: 200 },
    desktop: { sizeX: 400, sizeY: 240 },
  };

  const testUsers = [1, 2, 3, 4, 5, 6, 7, 8];

  const getRandomDeviation = () => {
    // Генерируем случайное отклонение в пределах [-20, 20] для x и y
    return {
      deviationX: Math.random() * 40 - 20,
      deviationY: Math.random() * 40 - 20,
    };
  };

  const screenIndex = (() => {
    if (screenWidth < 640) {
      return "phone";
    } else if (screenWidth < 1024) {
      return "tablet";
    } else if (screenWidth < 1280) {
      return "laptop";
    } else {
      return "desktop";
    }
  })();

  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={"/fire.gif"} alt="fire" className="w-[300px] h-auto z-30" />
      </div>
      {testUsers.map((remoteUser, index) => {
        const angle = (360 / testUsers.length) * index;
        const { deviationX, deviationY } = getRandomDeviation();
        const { x, y } = squareToCartesian(
          angle,
          screens[screenIndex].sizeX,
          screens[screenIndex].sizeY,
          deviationX,
          deviationY
        );

        const style: React.CSSProperties = {
          position: "absolute",
          top: `calc(50% + ${y}px)`,
          left: `calc(50% + ${x}px)`,
        };

        return (
          <div
            className="h-[130px] w-[130px] bg-red-500"
            key={remoteUser}
            style={style}
          >
            {/* Assuming RemoteUserPlayer is imported */}
            {/* <RemoteUserPlayer user={remoteUser} name={names[Number(remoteUser.uid)] ?? "No name"} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default RemoteUsersSquare;