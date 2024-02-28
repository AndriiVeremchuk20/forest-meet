"use client";

import { BackButton } from "@/components/button/back";
import { NextImage, NextLink } from "@/components/common";
import { HomeIcon } from "@/components/svgs";
import Routes from "@/config/routes";

const NotFoundPage = () => {
  return (
    <main className="z-50 flex h-screen w-full items-center justify-center backdrop-blur-md">
      <div className="flex h-auto space-y-3 border-[5px] border-green-600 dark:border-blue-900 phone:w-5/6 phone:flex-col tablet:w-4/5 laptop:flex-row desktop:w-3/6">
        <div className="bg-green-400 bg-opacity-60 p-5 dark:bg-blue-400 dark:bg-opacity-60">
          <NextImage src="/img/compass.png" className="m-auto w-[200px]" />
          <div className="text-center text-3xl">
            We not created this page yet
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center p-2">
          <h1 className="text-9xl">404</h1>
          <h1 className="text-5xl phone:text-4xl">Page not found</h1>
          <div className="flex w-full justify-center space-x-4">
            <BackButton />
            <NextLink type="button" href={Routes.home}>
              <span className="flex items-center space-x-2">
                <HomeIcon /> Home
              </span>
            </NextLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
