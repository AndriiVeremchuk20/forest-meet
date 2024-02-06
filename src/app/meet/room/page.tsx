"use client";

import dynamic from "next/dynamic";
import InputName from "@/components/form/name";
import Loader from "@/components/loader";
import { ToggleAudioButton, ToggleCameraButton } from "@/components/button";
import { Button, Box } from "@/components/common";
import { useRoomId } from "@/hooks/room-id";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReloadPageButton } from "@/components/button";
import {useMeetStore} from "@/store";

const VideoConference = dynamic(
  () => import("../../../components/meet/video-conference"),
  { ssr: false, loading: () => <Loader /> },
);

const UserPreview = dynamic(
  () => import("../../../components/meet/user-preview"),
  { ssr: false, loading: ()=> <Loader/> },
);

// getting a room id from  search params like: (meet/room?id=potato-home-monkey)
const RoomPage = () => {
  const router = useRouter();
  const roomId = useRoomId();
  const {meetCredentials, setMeetCredentials} = useMeetStore();
  const { data, status } = useSession();
  const isUserLoading = status === "loading";

  const [joined, setJoined] = useState<boolean>(false);
  const [name, setName] = useState<string | null | undefined>(data?.user.name); 

  const getMeetCredentialsMutations = api.agora.joinToRoom.useMutation({
    onSuccess(data) {
      setMeetCredentials(data);
      setJoined(true);
    },
    onError(error) {
      alert(error.message);
      router.replace("/meet/");
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

  if (getMeetCredentialsMutations.isLoading || isUserLoading) {
    return <Loader />;
  }

  if (!joined) {
    return (
      <main className="h-screen">
        <div className="flex h-full flex-col items-center justify-center gap-3 ">
          <div className="">{<UserPreview />}</div>
          {!data?.user.name && <InputName onInputChange={setName} />}
          <div className="grid grid-cols-3">
            <ToggleCameraButton />
            <ToggleAudioButton />
            <Button onClick={handleGoClick}>Go</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen">
      {meetCredentials && name ? (
        <VideoConference
          roomId={roomId}
          userName={name}
        />
      ) : (
        <Box>
          <h1>Something wrong.. Try reload page</h1> <ReloadPageButton />
        </Box>
      )}
    </main>
  );
};

export default RoomPage;
