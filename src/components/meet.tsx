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
import { type FC, useEffect} from "react";

interface MeetProps{
roomId: string,
token: string,
uid: number,
}

const Meet: FC<MeetProps> = ({roomId, token, uid}) => {
  const appId = env.NEXT_PUBLIC_AGORA_APP_ID;
   const client = useRTCClient();

  // getting local camera and microphone tracks
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const isLoading = isLoadingCam || isLoadingMic;

  const remoteUsers = useRemoteUsers();

  usePublish([localCameraTrack, localMicrophoneTrack]);

  console.log({ appId, token, roomId, uid });

  const join = useJoin({
    appid: env.NEXT_PUBLIC_AGORA_APP_ID,
    token: token, //env.NEXT_PUBLIC_AGORA_TOKEN,
    channel: roomId ?? "", //env.NEXT_PUBLIC_AGORA_CHANNEL,
    uid,
  });

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
    console.log(join);
    console.log(env.NEXT_PUBLIC_AGORA_APP_ID);
  }, [join]);

  useEffect(() => {
    return () => {
      localCameraTrack?.close();
      localMicrophoneTrack?.close();
    };
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
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

export default Meet;

