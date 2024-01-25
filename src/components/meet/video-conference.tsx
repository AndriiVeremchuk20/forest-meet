"use client";

import { env } from "@/env";
import {
  useClientEvent,
  useJoin,
  usePublish,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";
import { type FC, useEffect, useState, useRef } from "react";
import { useLocalDevice, useRtmChannel } from "@/hooks";
import { useRtmClient } from "@/providers/agora";
import LocalUserPlayer from "./palyer/local-user";
import MeetControl from "./control";
import RemoteUserPlayer from "./palyer/remote-user";

interface MeetProps {
  roomId: string;
  userName: string;
  credentials: {
    uid: number;
    rtcToken: string;
    rtmToken: string;
  };
}

const VideoConference: FC<MeetProps> = ({ roomId, userName, credentials }) => {
  const APP_ID = env.NEXT_PUBLIC_AGORA_APP_ID;
  const { uid, rtcToken, rtmToken } = credentials;

  const rtcClient = useRTCClient(); // agora RTC client
  const rtmClient = useRtmClient(); // agora RTM client

  const rtmChannel = useRtmChannel({ channelName: roomId }); // create RTM channel

  const {
    isLoading: isLoadingDevice,
    localCameraTrack,
    localMicrophoneTrack,
  } = useLocalDevice();

  const remoteUsers = useRemoteUsers(); // get all remote users
  const [rtmUsers, setRemoteRtmUsers] = useState<
    { uid: number; name: string }[]
  >([]); // collect rtm remote users

  const joinAudioRef = useRef<HTMLAudioElement|null>(null);
  const leaveAudioRef = useRef<HTMLAudioElement|null>(null);

  const join = useJoin({
    appid: APP_ID,
    token: rtcToken,
    channel: roomId,
    uid: uid.toString(),
  });

  const publish = usePublish([localMicrophoneTrack, localCameraTrack]);

  const isLoadingJoin = publish.isLoading || join.isLoading;

  useClientEvent(rtcClient, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
	if(joinAudioRef.current){
	   joinAudioRef.current.play().catch(error=>console.log(error));
	}
  });

  useClientEvent(rtcClient, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
	if(leaveAudioRef.current){
	   leaveAudioRef.current.play().catch(error=>console.log(error));
	}
  });

  const initRtm = async () => {
    await rtmClient.login({ uid: uid.toString(), token: rtmToken });
    rtmChannel
      .join()
      .then(() => console.log("Join success"))
      .catch((error) => console.log(error));

    await rtmClient.addOrUpdateLocalUserAttributes({
      name: userName,
      userRtcUid: uid.toString(),
    });

    console.log("Attr updated");

    const members = await rtmChannel.getMembers();
    const membInfo = await Promise.all(
      members.map(async (m) => {
        const { name, userRtcUid } = await rtmClient.getUserAttributesByKeys(
          m,
          ["name", "userRtcUid"],
        );
        return { name: name ?? "error", uid: Number(userRtcUid) };
      }),
    );

    setRemoteRtmUsers(membInfo);

    rtmChannel.on("MemberJoined", async (memberId) => {
      const { name, userRtcUid } = await rtmClient.getUserAttributesByKeys(
        memberId,
        ["name", "userRtcUid"],
      );

      console.log("Joined", { name, userRtcUid });

      if (name && userRtcUid)
        setRemoteRtmUsers((prev) => [
          ...prev,
          { name, uid: Number(userRtcUid) },
        ]);
    });

    rtmChannel.on("MemberLeft", (memberId) => {
      console.log("Jeft ", memberId);
      setRemoteRtmUsers((prev) =>
        prev.filter((u) => u.uid !== Number(memberId)),
      );
    });
  };

  const onLeaveRoom = async () => {
    //await rtmLogout();
    localCameraTrack?.close();
    localMicrophoneTrack?.close();
    await rtcClient.leave();
    await rtmChannel.leave();
  };

  useEffect(() => {
    // init rtm client
    initRtm()
      .then(() => console.log("Login success"))
      .catch((error) => console.log(error));

    return () => {
      onLeaveRoom().catch((error) => console.log(error));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingDevice || isLoadingJoin) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-[200px] w-[300px] flex-col items-center justify-center gap-3 border-[5px] border-green-400 text-2xl backdrop-blur-md dark:border-blue-900">
          {isLoadingDevice && <div>Loading devices</div>}
          {isLoadingJoin && <div>Joining</div>}
        </div>
      </div>
    );
  }

  if (!join.isConnected) {
    return (
      <div>
        <div className="my-10">Not connected: {join.error?.message}</div>
      </div>
    );
  }

  return (
    <div className="">
      {/*audio that used when users joined and leave*/}
     <>
      <audio ref={joinAudioRef} controls preload="auto" className="hidden">
        <source src="/audio/join_caw_sound.mp3" type="audio/mp3" />
      </audio>
      <audio ref={leaveAudioRef} controls src="/audio/leave-whoosh.mp3" preload="auto" className="hidden">
        <source src="/audio/leave-whoosh.mp3" type="audio/mp3" />
      </audio>
    </>      <div className="absolute bottom-24 right-5">
        <LocalUserPlayer cameraTrack={localCameraTrack} />
      </div>
      <div className="grid w-full grid-flow-col-dense gap-3">
        {/* <RemoteUsersCircle remoteUsers={remoteUsers} />*/}
        {remoteUsers.map((remoteUser) => (
          <RemoteUserPlayer
            key={remoteUser.uid}
            user={remoteUser}
            name={
              rtmUsers.filter((user) => {
                return user.uid == remoteUser.uid;
              })[0]?.name ?? "Not found"
            }
          />
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <MeetControl onLeaveClick={onLeaveRoom} />
      </div>
    </div>
  );
};

export default VideoConference;
