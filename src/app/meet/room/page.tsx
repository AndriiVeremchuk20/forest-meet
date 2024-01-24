"use client";

import { ToggleAudioButton, ToggleCameraButton } from "@/components/button";
import { Button } from "@/components/default";
import InputName from "@/components/form/name";
import Loader from "@/components/loader";
import { UserPreview } from "@/components/meet/user-preview";
import { useRoomId } from "@/hooks";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VideoConference = dynamic(
  () => import("../../../components/meet/video-conference"),
  { ssr: false },
);

// getting a room id from  search params like: (meet/room?id=potato-home-monkey)
const RoomPage = () => {
  const router = useRouter();
  const roomId = useRoomId();
  const { data, status } = useSession();

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

  if (!roomId) {
    return <div>Room id not found</div>;
  }

  if (getMeetCredentialsMutations.isLoading) {
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
          <div className="">
            <UserPreview />
          </div>
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
