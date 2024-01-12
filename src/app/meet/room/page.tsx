"use client";

import { env } from "@/env";
//import {api} from "@/trpc/react";
import {
  LocalVideoTrack,
  RemoteUser,
  useClientEvent,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// getting a room id from  search params like: (/room?id=someId&token=tokeeeeen)
const RoomPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");
  const session = useSession();

  const client = useRTCClient();

  // getting local camera and microphone tracks
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  //const { isLoading: isLoadingMic, localMicrophoneTrack } =
  useLocalMicrophoneTrack();

  const isLoading = isLoadingCam; //|| isLoadingMic;

  const remoteUsers = useRemoteUsers();

  useJoin({
    appid: env.NEXT_PUBLIC_AGORA_APP_ID,
    token: token, //env.NEXT_PUBLIC_AGORA_TOKEN,
    channel: roomId ?? "", //env.NEXT_PUBLIC_AGORA_CHANNEL,
    uid,
  });

  usePublish([localCameraTrack]);

  useClientEvent(client, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(client, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(client, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  useEffect(() => {
    setIsMounted(true);

    return () => {
      localCameraTrack?.close();
      //   localMicrophoneTrack?.close();
    };
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isMounted) {
    return <div>Mounted</div>;
  }

  return (
    <main>
      Room: {roomId} Users: {remoteUsers.length}
      <div>
        <div className="h-[300px] w-full">
          <LocalVideoTrack track={localCameraTrack} play={true} />
        </div>
        <div className="grid grid-cols-3">
          {remoteUsers.map((remoteUser) => (
            <div className="h-[300px] w-[300px]" key={remoteUser.uid}>
              <RemoteUser
                user={remoteUser}
                playVideo={true}
                playAudio={false}
                className="rounded-full border-[5px] border-red-400"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RoomPage;

/*
 * const router = useRouter();
  const session = useSession();
  const client = useRTCClient();
  const generateTokenMutation = api.agora.generateToken.useMutation({
    onSuccess(data) {
      console.log(data);
      router.push(`/room?id=${data.channelName}&token=${data.token}`);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const onCreateClick = () => {
    if (client.uid) {
      console.log(client.uid);
      generateTokenMutation.mutate({
        uid: client.uid.toString(),
        channelName: "temp",
        role: "publisher",
        expireTime: 400,
      });
    }
  };

  useEffect(() => {
    onCreateClick();
  }, [session.data?.user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Home page of user: {session.data?.user.name}
      <UserPreview />
      <div className="space-x-2">
        <button className="">Join</button>
        <button onClick={onCreateClick}>Create</button>
      </div>
    </main>
  );

 *
 * */
