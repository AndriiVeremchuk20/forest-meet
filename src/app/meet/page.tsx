"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LobbyPage = () => {
  const router = useRouter();
  const { status } = useSession();

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
      <div className="flex space-x-2">
        <button
          onClick={onJoinClick}
          className="bg-green-400 p-4 text-3xl text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950"
        >
          Join
        </button>
        {status === "authenticated" && (
          <button
            onClick={onCreateClick}
            className="bg-green-400 p-4 text-3xl text-white hover:bg-green-500 focus:bg-green-500 dark:bg-blue-900 dark:hover:bg-blue-950"
          >
            Create
          </button>
        )}
      </div>
    </main>
  );
};

export default LobbyPage;
