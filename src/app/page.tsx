"use client";

import { useSession } from "next-auth/react";
import AppLoading from "./loading";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <AppLoading />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl">What is Forest Meet?</h1>
      <div className="flex h-full flex-col items-center gap-5 border-[5px] border-green-400 p-4 backdrop-blur-xl dark:border-blue-900 phone:w-full desktop:w-4/6">
        <IntroText />
        <div className="">
          {data?.user ? (
            <Link
              href="/meet/lobby/"
              className="bg-green-400 p-4 text-3xl text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              Go To Forest Meet
            </Link>
          ) : (
            <Link
              href={"/auth"}
              className="bg-green-400 p-4 text-3xl text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

const IntroText = () => {
  return (
    <div className="flex gap-4 phone:flex-col desktop:flex-row">
      <span className="text-justify text-2xl">
        Forest Meet offers a unique online meeting experience, blending
        cutting-edge technologies with the warm atmosphere of friendly
        gatherings around a campfire.
      </span>
      <div className="flex items-center justify-center">
        <Image src="/home_pic.svg" width={400} height={400} alt="pic" />
      </div>
    </div>
  );
};

export default Home;
