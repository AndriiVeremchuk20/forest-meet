"use client";

import Chat from "@/components/chat";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
//import Meet from "@/components/meet";

const Meet = dynamic(
  () => import("../../../components/meet/video-conference"),
  { ssr: false },
);

// getting a room id from  search params like: (meet/room?id=potato-home-monkey)
const RoomPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");

  const [token, setToken] = useState<string | null>(null);
  const [rtmToken, setRtmtoken] = useState<string | null>(null);
  const [uid, setUid] = useState<number | null>(null);

  const getMeetCredentials = api.agora.joinToRoom.useMutation({
    onSuccess(data) {
      setToken(data.token.rtc);
      setUid(data.uid);
      setRtmtoken(data.token.rtm);
    },
    onError(error) {
      alert(error.message);
      router.replace("/meet/lobby");
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
    <main className="flex h-screen bg-[url('/meet.gif')] bg-cover bg-fixed">
      {roomId && token && uid && rtmToken && (
        <>
          <Meet
            roomId={roomId}
            rtcToken={token}
            rtmToken={rtmToken}
            uid={uid}
          />
        </>
      )}
    </main>
  );
};

export default RoomPage;
