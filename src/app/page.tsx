"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
	const {data, status} = useSession();
  
  if(status === "loading"){
	return <div>Loading</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      
	  <div>Home page of user: {data?.user.name}</div>
    </main>
  );
};

export default Home;
