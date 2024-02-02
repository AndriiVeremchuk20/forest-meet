"use client";

import Loader from "@/components/loader";
import { Button, Box } from "@/components/common";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LobbyPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const [roomId, setRoomId] = useState<string | null>(null);

  const { isLoading, mutate } = api.agora.createRoom.useMutation({
    onSuccess: async (data) => {
      //console.log(data);
      setRoomId(data.channelName);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const handleCreateClick = () => {
    mutate();
    if (roomId) {
      router.push(`/meet/room?id=${roomId}`);
    }
  };

  const handleJoinClick = () => {
    const channelName = prompt("Enter a channel name");

    if (channelName !== null && channelName.trim() !== "") {
      setRoomId(channelName);
    }
  };

  useEffect(() => {
    if (roomId) {
      router.push(`/meet/room?id=${roomId}`);
    }
    // eslint-disable-next-line
  }, [roomId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Box className="grid gap-10 p-10 phone:grid-cols-1 phone:grid-rows-2 desktop:grid-cols-2 desktop:grid-rows-1">
        <Button onClick={handleJoinClick}>Join</Button>
        <Button
          onClick={handleCreateClick}
          disabled={status === "unauthenticated"}
        >
          Create
        </Button>
      </Box>
    </main>
  );
};

export default LobbyPage;
