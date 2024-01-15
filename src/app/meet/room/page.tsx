"use client";

import { api } from "@/trpc/react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
//import Meet from "@/components/meet";

const Meet = dynamic(() => import("../../../components/meet"), { ssr: false });

// getting a room id from  search params like: (meet/room?id=potato-home-monkey)
const RoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");

  const [token, setToken] = useState<string | null>(null);
  const [uid, setUid] = useState<number | null>(null);

  const getMeetCredentials = api.agora.joinToRoom.useMutation({
    onSuccess(data) {
      setToken(data.token);
      setUid(data.uid);
    },
  });

  useEffect(() => {
    if (roomId) {
      getMeetCredentials.mutate({ channelName: roomId });
    }
  }, []);

  if (!roomId) {
    return <div>Room id not found</div>;
  }
  return (
    <main>
      {roomId && token && uid && (
        <Meet roomId={roomId} token={token} uid={uid} />
      )}
    </main>
  );
};

export default RoomPage;
