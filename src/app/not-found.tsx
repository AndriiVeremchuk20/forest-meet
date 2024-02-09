"use client";

import { NextImage, NextLink } from "@/components/common";

const NotFoundPage = () => {
  return (
    <main className="z-50 flex h-screen w-full items-center justify-center backdrop-blur-md">
      <div className="flex laptop:flex-row phone:flex-col h-auto space-y-3 border-[5px] border-green-400 dark:border-blue-900 phone:w-5/6 tablet:w-4/5 desktop:w-3/6">
        <div className="p-5 bg-blue-500 bg-opacity-40">
          <NextImage src="/compass.png" className="m-auto w-[200px]" />
          <span className="text-center text-2xl">
            We not created this page yet
          </span>
        </div>

        <div className="p-2 flex flex-col text-center">
          <h1 className="text-9xl">404</h1>
          <h1 className="text-5xl">Page not found</h1>
          <div className="flex w-full justify-center">
            <NextLink type="button" href="/">
              Home
            </NextLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
