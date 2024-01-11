"use client";

import { useSession } from "next-auth/react";
import AppLoading from "./loading";

const Home = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <AppLoading />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div>Home page of user: {data?.user.name}</div>
    </main>
  );
};

export default Home;
