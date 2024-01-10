"use client";

import { UserPreview } from "@/components/user-preview";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Home page
      <UserPreview />
	  <div>
		<button>Join</button>
		<button>Create</button>
	  </div>
    </main>
  );
};

export default Home;
