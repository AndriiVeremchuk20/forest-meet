"use client";

import { ToggleAudioButton, ToggleCameraButton } from "@/components/button";
import { Button } from "@/components/default";
import { useRoomId } from "@/hooks/room-id";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputName from "@/components/form/name";
import Loader from "@/components/loader";
import dynamic from "next/dynamic";

const VideoConference = dynamic(
  () => import("../../../components/meet/video-conference"),
  { ssr: false, loading: ()=><Loader/>, },
);

const UserPreview = dynamic(
  () => import("../../../components/meet/user-preview"),
  { ssr: false },
);

// getting a room id from  search params like: (meet/room?id=potato-home-monkey)
const RoomPage = () => {
  const router = useRouter();
  const roomId = useRoomId();
  const { data, status } = useSession();

  const [joined, setJoined] = useState<boolean>(false);
  const [name, setName] = useState<string | null | undefined>(data?.user.name);
  const [credentials, setCredentials] = useState<{
    rtcToken: string;
    rtmToken: string;
    uid: number;
  } | null>();

  const getMeetCredentialsMutations = api.agora.joinToRoom.useMutation({
    onSuccess(data) {
      setCredentials({
        uid: data.uid,
        rtcToken: data.token.rtc,
        rtmToken: data.token.rtm,
      });
      setJoined(true);
    },
    onError(error) {
      alert(error.message);
      router.replace("/meet/lobby");
    },
  });

  const handleGoClick = () => {
    if (status !== "authenticated") {
      setName((prev) => `Guest(${prev})`);
    }

    if (roomId) getMeetCredentialsMutations.mutate({ channelName: roomId });
  };

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name);
    }
  }, [data]);

  if (!roomId) {
    return <div>Room id not found</div>;
  }

  if (getMeetCredentialsMutations.isLoading || status === "loading") {
    return <Loader />;
  }

  return (
    <main className="h-screen">
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
        <div className="flex h-full flex-col items-center justify-center gap-3 ">
          <div className="">{<UserPreview />}</div>
          {!data?.user.name && <InputName onInputChange={setName} />}
          <div className="grid grid-cols-3">
            <ToggleCameraButton />
            <ToggleAudioButton />
            <Button onClick={handleGoClick}>Go</Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default RoomPage;
