"use client";

import { Button } from "@/components/default";
import Loader from "@/components/loader";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LobbyPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const createButtonIsMuted = status !=="authenticated"; // only logged-in users can create rooms

  const { isLoading, mutate } = api.agora.createRoom.useMutation({
    onSuccess: async (data) => {
      //console.log(data);
      router.push(`/meet/room?id=${data.channelName}`);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const handleCreateClick = () => {
    mutate();
  };

  const handleJoinClick = () => {
    const channelName = prompt("Enter a channel name");

    if (channelName !== null && channelName.trim() !== "") {
      router.push(`/meet/room?id=${channelName}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-10 border-[5px] border-green-500 p-10 backdrop-blur-2xl dark:border-blue-900">
        <Button onClick={handleJoinClick}>Join</Button>
        {status === "authenticated" && (
          <Button onClick={handleCreateClick}>Create</Button>
        )}
      </div>
    </main>
  );
};

export default LobbyPage;
