"use client"

import {useSession} from "next-auth/react";
import { NextImage } from "./common";


const ProfileCard = () => {
  const {data} = useSession();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="border-[7px] border-green-500 dark:border-blue-900">
        <NextImage src={data?.user.image ?? "/img/user.png"} alt="avatar" className="w-[200px]"/>
      </div>
      <div className="text-3xl p-4">{data?.user.name}</div>
	</div>
  );
};

export default ProfileCard;
