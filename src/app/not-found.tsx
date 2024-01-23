"use client";

import { CustomNextLink } from "@/components/default";

const NotFoundPage = () => {
  return (
    <main className="z-50 flex h-screen w-full items-center justify-center backdrop-blur-md">
      <div className="border-[5px] h-auto space-y-3 border-green-400 dark:border-blue-900 phone:w-5/6 tablet:w-4/5 desktop:w-3/6">
        <div className="text-center">
          <h1 className="text-9xl">404</h1>
          <h1 className="text-5xl">Page not found</h1>
        </div>
        <div className="w-full flex justify-center">
          <CustomNextLink href="/">Home</CustomNextLink>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
