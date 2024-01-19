"use client";

import { useSession } from "next-auth/react";
import AppLoading from "./loading";
import Link from "next/link";

const Home = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <AppLoading />;
  }

  return (
    <main className=" flex min-h-screen flex-col items-center justify-center">
      <div>Home page of user: {data?.user.name}</div>
      <div>
        {data?.user ? (
          <>
            <Link href="/meet/lobby/" className="text-blue-500 hover:underline">
              Go To Forest Meet
            </Link>
          </>
        ) : (
          <Link href={"/auth"}>Sign in</Link>
        )}
      </div>
    </main>
  );
};

export default Home;
