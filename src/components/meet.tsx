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
import { type FC, useEffect, useRef } from "react";
import LeaveButton from "./buttons/leave";

interface MeetProps {
  roomId: string;
  token: string;
  uid: number;
}

const Meet: FC<MeetProps> = ({ roomId, token, uid }) => {
  const AppId = env.NEXT_PUBLIC_AGORA_APP_ID;
  const client = useRTCClient();
  const audioRef = useRef<HTMLAudioElement>(null);

  // getting local camera and microphone tracks
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const remoteUsers = useRemoteUsers();

  //  console.log({ AppId, token, roomId, uid });

  const join = useJoin({
    appid: AppId,
    token: token.replace(" ", "+"), //env.NEXT_PUBLIC_AGORA_TOKEN,
    channel: roomId, //env.NEXT_PUBLIC_AGORA_CHANNEL,
    uid: uid.toString(),
  });

  const publish = usePublish([localCameraTrack, localMicrophoneTrack]);

  const isLoading =
    isLoadingCam || isLoadingMic || publish.isLoading || join.isLoading;

  useClientEvent(client, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => console.log("Played"))
        .catch((error) => console.log(error));
    }
  });

  useClientEvent(client, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(client, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  useEffect(() => {
    console.log(join.error?.rtcError);
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
      <>
        <audio
          src="/audio/join_caw_sound.mp3"
          ref={audioRef}
          preload={"auto"}
          className="hidden"
        />
      </>
      {join.isConnected ? (
        <div>
          <div className="absolute bottom-10 right-5 h-fit w-fit border-[5px] border-red-800">
            <div className="h-[300px] w-[300px]">
              <LocalVideoTrack track={localCameraTrack} play={true} />
            </div>
            <div>
              <LeaveButton />
            </div>
          </div>
          <div className="grid grid-cols-2">
            {remoteUsers.map((remoteUser) => (
              <div className="h-[200px] w-[200px]" key={remoteUser.uid}>
                <RemoteUser
                  user={remoteUser}
                  playVideo={true}
                  playAudio={true}
                  className="border-[5px] border-red-900"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-10">Not connected: {join.error?.message}</div>
      )}
    </main>
  );
};

export default Meet;
