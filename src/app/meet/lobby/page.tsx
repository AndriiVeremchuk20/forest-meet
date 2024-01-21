"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LobbyPage = () => {
  const router = useRouter();
  const { data } = useSession();

  const createRoomMutation = api.agora.createRoom.useMutation({
    onSuccess: async (data) => {
      console.log(data);
      router.push(`/meet/room?id=${data.channelName}`);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const onCreateClick = () => {
    createRoomMutation.mutate();
  };

  const onJoinClick = () => {
    const channelName = prompt("Enter a channel name");

    if (channelName !== null && channelName.trim() !== "") {
      router.push(`/meet/room?id=${channelName}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      Home page of user: {data?.user.name}
      <div className="space-x-2">
        <button onClick={onJoinClick} className="">
          Join
        </button>
        <button onClick={onCreateClick}>Create</button>
      </div>
    </main>
  );
};

export default LobbyPage;
