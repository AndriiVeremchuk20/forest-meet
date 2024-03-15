"use client";

import { Box, Button, NextImage } from "@/components/common";
import { StartLinks } from "@/components/start-links";
import { DownIcon } from "@/components/svgs";
import { useRef } from "react";

export default function Home() {
  const ancorRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-hidden">
        {/*Welcome text*/}
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="animate-fade bg-green-500 bg-opacity-30 px-4 animate-once dark:bg-blue-900 dark:bg-opacity-70  phone:text-3xl tablet:text-6xl desktop:text-8xl">
            Welcome to Forest Meet
          </h1>
          <Box className="flex phone:flex-col tablet:flex-row laptop:flex-row">
            <div className="flex w-full justify-around">
              <NextImage
                src="/img/light_ex.png"
                alt="example_1"
                className="h-fit phone:w-[180px] tablet:w-full"
              />
              <NextImage
                src="/img/dark_ex.png"
                alt="example_1"
                className="h-fit phone:block phone:w-[180px] tablet:hidden tablet:w-[300px]"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-balance p-1 text-justify laptop:text-3xl">
                Forest Meet is an online meeting platform that offers a
                distinctive experience, seamlessly blending cutting-edge
                technologies with the cozy ambiance of friendly gatherings
                around a virtual campfire set amidst the serene surroundings of
                a virtual forest.
              </div>
              <Button
                onClick={() => {
                  ancorRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="flex animate-bounce items-center justify-center">
                  <DownIcon />
                </div>
              </Button>
            </div>
          </Box>
        </div>

        <div
          className="flex h-screen flex-col justify-end"
          data-aos="fade-left"
        >
          <StartLinks />
          <div ref={ancorRef} data-aos="fade-up">
            <NextImage src="/img/fire.gif" alt="fire-gif" />
          </div>
        </div>
      </div>
    </main>
  );
}
