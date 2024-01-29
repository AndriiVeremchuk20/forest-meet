"use client";

import LocalUserPlayer from "./palyer/local-user";
import MeetControl from "./control";
import { env } from "@/env";
import {
  useClientEvent,
  useJoin,
  usePublish,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";
import { type FC, useEffect, useState, useRef } from "react";
import { useLocalDevice, useRtmChannel, useGeofencing } from "@/hooks/agora";
import { useRtmClient } from "@/providers/agora";
import { JoinLeavePlayer } from "./join-leave-player";
import { Box } from "../common";
import { ReloadPageButton } from "../button";
import { EnsureCallQuality } from "../agora/ensure-call-quality";
import dynamic from "next/dynamic";
//import RemoteUsersCircle from "./remote-users-circle";

const UsersAroundFire = dynamic(() => import("./users-around-fire"), {
  ssr: false,
});

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
  const [rtmUsers, setRemoteRtmUsers] = useState<Record<number, string>>({}); // collect rtm remote users

  const joinAudioRef = useRef<HTMLAudioElement | null>(null);
  const leaveAudioRef = useRef<HTMLAudioElement | null>(null);

  const join = useJoin({
    appid: APP_ID,
    token: rtcToken,
    channel: roomId,
    uid: uid.toString(),
  });

  const publish = usePublish([localMicrophoneTrack, localCameraTrack]);

  //enable geofencing
  useGeofencing();

  const isLoadingJoin = publish.isLoading || join.isLoading;

  useClientEvent(rtcClient, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
    if (joinAudioRef.current) {
      joinAudioRef.current.play().catch((error) => console.log(error));
    }
  });

  useClientEvent(rtcClient, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
    if (leaveAudioRef.current) {
      leaveAudioRef.current.play().catch((error) => console.log(error));
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

    const members = await rtmChannel.getMembers();
    const recordMembersInfo: Record<number, string> = {};
    await Promise.all(
      members.map(async (m) => {
        const { name, userRtcUid } = await rtmClient.getUserAttributesByKeys(
          m,
          ["name", "userRtcUid"],
        );
        recordMembersInfo[Number(userRtcUid)] = name ?? "No name";
      }),
    );

    setRemoteRtmUsers(recordMembersInfo);

    rtmChannel.on("MemberJoined", async (memberId) => {
      const { name, userRtcUid } = await rtmClient.getUserAttributesByKeys(
        memberId,
        ["name", "userRtcUid"],
      );

      if (name && userRtcUid)
        setRemoteRtmUsers((prev) => {
          const updatedUsers: Record<number, string> = { ...prev };
          updatedUsers[Number(userRtcUid)] = name;
          return updatedUsers;
        });
    });

    rtmChannel.on("MemberLeft", (memberId) => {
      setRemoteRtmUsers((prev) => {
        const updatedUsers: Record<number, string> = { ...prev };
        delete updatedUsers[Number(memberId)];

        return updatedUsers;
      });
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
      <main className="flex h-screen w-full items-center justify-center">
        <Box className="flex h-[200px] w-[300px] flex-col items-center justify-center gap-3 text-2xl">
          {isLoadingDevice && <div>Loading devices</div>}
          {isLoadingJoin && <div>Joining</div>}
        </Box>
      </main>
    );
  }

  if (!join.isConnected) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <Box className="gap-5">
          <h1 className="text-5xl">
            Something happened. Try to reload the page
          </h1>
          <ReloadPageButton />
        </Box>
      </main>
    );
  }

  return (
    <EnsureCallQuality localCameraTrack={localCameraTrack}>
      <div className="h-screen">
        {/*audio that used when users joined and leave*/}
        <JoinLeavePlayer
          joinAudioRef={joinAudioRef}
          leaveAudioRef={leaveAudioRef}
        />
        {/*<div className="absolute bottom-24 right-5">
          <LocalUserPlayer cameraTrack={localCameraTrack} />
        </div>*/}
        {
          <UsersAroundFire
            remoteUsers={remoteUsers}
            localUserCameraTrack={localCameraTrack}
          />
        }
        <div className="absolute bottom-0 w-full">
          <MeetControl onLeaveClick={onLeaveRoom} />
        </div>
      </div>
    </EnsureCallQuality>
  );
};

export default VideoConference;
