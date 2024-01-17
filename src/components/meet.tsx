"use client";

import { env } from "@/env";
import {
  //LocalVideoTrack,
  //RemoteUser,
  useClientEvent,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";
import { type FC, useEffect, useRef } from "react";
import LeaveButton from "./button/leave";
import { ToggleAudioButton, ToggleVideoButton } from "./button/media-control";
import RemoteUserPlayer from "./palyer/remote-user";
import LocalUserPlayer from "./palyer/local-user";
import MeetControl from "./meet-control";
import RemoteUsersCircle from "./remote-users-circle";

interface MeetProps {
  roomId: string;
  token: string;
  uid: number;
}

const Meet: FC<MeetProps> = ({ roomId, token, uid }) => {
  const AppId = env.NEXT_PUBLIC_AGORA_APP_ID;
  const client = useRTCClient();
  const audioRef = useRef<HTMLAudioElement>(null);

  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const remoteUsers = useRemoteUsers();

  const join = useJoin({
    appid: AppId,
    token: token,
    channel: roomId,
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

  // client.enableAudioVolumeIndicator();

  useClientEvent(client, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(client, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

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
    <div>
      <>
        <audio
          src="/audio/join_caw_sound.mp3"
          ref={audioRef}
          preload={"auto"}
          className="hidden"
        />
      </>
      {join.isConnected ? (
        <div className="">
          <div className="absolute bottom-24 right-5">
              <LocalUserPlayer cameraTrack={localCameraTrack} />
          </div>
          <div className="w-full">
            <RemoteUsersCircle remoteUsers={remoteUsers}/>
			{/*remoteUsers.map((remoteUser) => (
              <div className="h-[200px] w-[200px]" key={remoteUser.uid}>
                <RemoteUserPlayer user={remoteUser} />
              </div>
            ))*/}
          </div>
          <div className="absolute bottom-0 w-full">
		    <MeetControl audioTrack={localMicrophoneTrack} videoTrack={localCameraTrack}/> 
          </div>
        </div>
      ) : (
        <div className="my-10">Not connected: {join.error?.message}</div>
      )}
    </div>
  );
};

export default Meet;
