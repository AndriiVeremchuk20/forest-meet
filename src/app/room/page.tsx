"use client";

import { env } from "@/env";
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
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// getting a room id from  search params like: (/room?id=someId)
const RoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");
  const token = searchParams.get("token");

  const client = useRTCClient();

  // getting local camera and microphone tracks
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  //const { isLoading: isLoadingMic, localMicrophoneTrack } =
  useLocalMicrophoneTrack();

  const isLoading = isLoadingCam; //|| isLoadingMic;

  const remoteUsers = useRemoteUsers();

  useJoin({
    appid: env.NEXT_PUBLIC_AGORA_APP_ID,
    token: env.NEXT_PUBLIC_AGORA_TOKEN,
    channel: env.NEXT_PUBLIC_AGORA_CHANNEL,
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
    return () => {
      localCameraTrack?.close();
      //   localMicrophoneTrack?.close();
    };
  }, []);

  return (
    <main>
      Room: {roomId}
      <div>
        <div className="h-[300px] w-[300px]">
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
