"use client";

import InputName from "@/components/form/name";
import { UserPreview } from "@/components/meet/user-preview";
import useRoom from "@/hooks/room-id";
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
    },
    onError(error) {
      alert(error.message);
      router.replace("/meet/lobby");
    },
  });

  const handleGoClick = () => {
	if(status !== "authenticated"){
		setName(prev=>`Guest(${prev})`);
	}
    
	if(roomId)
	getMeetCredentialsMutations.mutate({channelName: roomId});

	setJoined(true);
  }
   
  //useEffect(() => {
  //  if (roomId) {
  //    getMeetCredentialsMutations.mutate({ channelName: roomId });
  //  }
  //}, []);

  if (!roomId) {
    return <div>Room id not found</div>;
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
        <div className="h-full flex gap-3 flex-col justify-center items-center ">
          <div className="">
            <UserPreview />
          </div>
          {!data?.user.name && (
		     <InputName onInputChange={setName}/>
           )}
          <button onClick={handleGoClick} className="p-4  bg-gray-400 text-white dark:text-white dark:bg-blue-900">
            Go
          </button>
        </div>
      )}
    </main>
  );
};

export default RoomPage;
