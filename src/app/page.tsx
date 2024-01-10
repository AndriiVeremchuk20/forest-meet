"use client";

import { UserPreview } from "@/components/user-preview";
import { api } from "@/trpc/react";
import { useRTCClient } from "agora-rtc-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const client = useRTCClient();
  const generateTokenMutation = api.agora.generateToken.useMutation({
    onSuccess(data) {
      console.log(data);
      router.push(`/room?id=${data.channelName}&token=${data.token}`);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const onCreateClick = () => {
    if (client.uid) {
      console.log(client.uid);
      generateTokenMutation.mutate({
        uid: client.uid.toString(),
        channelName: "temp",
        role: "publisher",
        expireTime: 400,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Home page
      <UserPreview />
      <div className="space-x-2">
        <button className="">Join</button>
        <button onClick={onCreateClick}>Create</button>
      </div>
    </main>
  );
};

export default Home;
