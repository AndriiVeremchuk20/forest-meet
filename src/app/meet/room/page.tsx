"use client";

import useRoom from "@/hooks/use-room";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import Meet from "@/components/meet";

const VideoConference = dynamic(
  () => import("../../../components/meet/video-conference"),
  { ssr: false },
);

// getting a room id from  search params like: (meet/room?id=potato-home-monkey)
const RoomPage = () => {
  const router = useRouter();
  const roomId = useRoom();
  const { data } = useSession();

  const [credentials, setCredentials] = useState<{
    rtcToken: string;
    rtmToken: string;
    uid: number;
  } | null>();

  const [name, setName] = useState<string | null | undefined>(data?.user.name);

  const getMeetCredentials = api.agora.joinToRoom.useMutation({
    onSuccess(data) {
      setCredentials({
        uid: data.uid,
        rtcToken: data.token.rtc,
        rtmToken: data.token.rtm,
      });
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
      {roomId && credentials && (
        <VideoConference roomId={roomId} credentials={credentials} />
      )}
    </main>
  );
};

export default RoomPage;
