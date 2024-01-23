"use client";

import { useSession } from "next-auth/react";
import AppLoading from "./loading";
import { CustomNextLink } from "@/components/default";

const Home = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <AppLoading />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl">What is Forest Meet?</h1>
      <div className="flex h-full flex-col items-center gap-5 border-[5px] border-green-400 p-4 backdrop-blur-xl dark:border-blue-900 phone:w-full tablet:w-5/6 desktop:w-4/6">
        <IntroText />
        <Links />
      </div>
    </main>
  );
};

const IntroText = () => {
  return (
    <div className="flex gap-4 phone:flex-col desktop:flex-row">
      <span className="text-justify text-2xl">
        Forest Meet is an online meeting platform that offers a unique
        experience, merging cutting-edge technologies with the warm atmosphere
        of friendly gatherings around a virtual campfire.
      </span>
    </div>
  );
};

const Links = () => {
  const { data } = useSession();
  return (
    <div className="">
      {data?.user ? (
        <CustomNextLink href="/meet/">Go To Forest Meet</CustomNextLink>
      ) : (
        <div className="flex space-x-3">
          <CustomNextLink href={"/meet/"}>Join</CustomNextLink>

          <CustomNextLink href={"/auth/"}>Sign in</CustomNextLink>
        </div>
      )}
    </div>
  );
};

export default Home;
