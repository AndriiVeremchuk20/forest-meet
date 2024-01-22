"use client";

import { UserPreview } from "@/components/meet/user-preview";
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

  const [joined, setJoined] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<{
    rtcToken: string;
    rtmToken: string;
    uid: number;
  } | null>();

  const [name, setName] = useState<string | null | undefined>(data?.user.name);

  const getMeetCredentialsMutations = api.agora.joinToRoom.useMutation({
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
      getMeetCredentialsMutations.mutate({ channelName: roomId });
    }
  }, []);

  if (!roomId) {
    return <div>Room id not found</div>;
  }

  return (
    <main className="flex h-screen bg-cover bg-fixed">
      {joined ? (
        <>
          {roomId && credentials && name && joined && (
            <VideoConference
              roomId={roomId}
              userName={name}
              credentials={credentials}
            />
          )}
        </>
      ) : (
        <div>
          <div className="h-[400px] w-[300px] bg-neutral-500">
            <UserPreview />
          </div>
          {!data?.user.name && (
            <div>
              <label>Your name:</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <button onClick={() => setJoined(true)} className="bg-zinc-600 p-4">
            Join
          </button>
        </div>
      )}
    </main>
  );
};

export default RoomPage;
