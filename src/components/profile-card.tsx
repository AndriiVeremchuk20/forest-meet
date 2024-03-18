"use client";

import { useSession } from "next-auth/react";
import { NextImage } from "./common";
import { PencilIcon } from "./svgs";
import Link from "next/link";

const ProfileCard = () => {
  const { data } = useSession();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="border-[7px] border-green-500 dark:border-blue-900">
        <NextImage
          src={data?.user.image ?? "/img/user.png"}
          alt="avatar"
          className="w-[200px]"
        />
      </div>
      <div className="p-4 text-3xl">{data?.user.name}</div>
      <Link href={"/profile/edit"}>
        <PencilIcon width={50} height={50} />
      </Link>
    </div>
  );
};

export default ProfileCard;
