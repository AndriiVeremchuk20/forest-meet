"use client"

import React, { FC, useEffect, useState } from "react";

const RemoteUsersSquare: FC = () => {


  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={"/fire.gif"} alt="fire" className="w-[300px] h-auto z-30" />
      </div>
       

    </div>
  );
};

export default RemoteUsersSquare;
