"use client";

import { env } from "@/env";
import {
  useClientEvent,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";
import { type FC, useEffect, useState } from "react";
import LocalUserPlayer from "./palyer/local-user";
import MeetControl from "./control";
import { useRtmClient } from "@/providers/agora";
import RemoteUserPlayer from "./palyer/remote-user";
import useRtmChannel from "@/hooks/use-rtm-channel";

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

  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const remoteUsers = useRemoteUsers();
  const [rtmUsers, setRemoteRtmUsers] = useState<
    { uid: number; name: string }[]
  >([]);

  const join = useJoin({
    appid: APP_ID,
    token: rtcToken,
    channel: roomId,
    uid: uid.toString(),
  });

  const publish = usePublish([localMicrophoneTrack, localCameraTrack]);

  const isLoadingDevice = isLoadingCam || isLoadingMic;

  const isLoadingJoin = publish.isLoading || join.isLoading;

  useClientEvent(rtcClient, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(rtcClient, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  //useClientEvent(rtcClient, "user-published", (user) => {
  //  console.log("The user", user.uid, " has published media in the channel");
  //});

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

  const rtmLogout = async () => {
    await rtmClient.logout();
    await rtmChannel.leave();
  };

  useEffect(() => {
    return () => {
      localCameraTrack?.close();
      localMicrophoneTrack?.close();
      rtmLogout().catch((error) => console.log(error));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initRtm()
      .then(() => console.log("Login success"))
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingDevice || isLoadingJoin) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-[200px] w-[300px] flex-col items-center justify-center gap-3 border-[5px] border-orange-900 text-2xl backdrop-blur-sm">
          {isLoadingDevice && <div>Loading devices</div>}
          {isLoadingJoin && <div>Joining</div>}
        </div>
      </div>
    );
  }

  return (
    <div>
      {join.isConnected ? (
        <div className="">
          <div className="absolute bottom-24 right-5">
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
            <MeetControl
              audioTrack={localMicrophoneTrack}
              videoTrack={localCameraTrack}
            />
          </div>
        </div>
      ) : (
        <div className="my-10">Not connected: {join.error?.message}</div>
      )}
    </div>
  );
};

export default VideoConference;
