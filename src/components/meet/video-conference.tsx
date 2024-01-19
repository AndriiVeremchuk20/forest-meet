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
import { type FC, useEffect, useState } from "react";
import LocalUserPlayer from "./palyer/local-user";
import MeetControl from "./control";
//import RemoteUsersCircle from "./remote-users-circle";
import { useRtmClient } from "@/providers/agora";
import RemoteUserPlayer from "./palyer/remote-user";
import useRtmChannel from "@/hooks/use-rtm-channel";
import { useSession } from "next-auth/react";
import AgoraRTM from "agora-rtm-react";

interface MeetProps {
  roomId: string;
  uid: number;
  rtcToken: string;
  rtmToken: string;
}

const VideoConference: FC<MeetProps> = ({
  roomId,
  uid,
  rtcToken,
  rtmToken,
}) => {
  const APP_ID = env.NEXT_PUBLIC_AGORA_APP_ID;
  const { data: userData } = useSession();

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

  const publish = usePublish([localCameraTrack, localMicrophoneTrack]);

  const isLoading =
    isLoadingCam || isLoadingMic || publish.isLoading || join.isLoading;

  useClientEvent(rtcClient, "user-joined", (user) => {
    console.log("The user", user.uid, " has joined the channel");
  });

  useClientEvent(rtcClient, "user-left", (user) => {
    console.log("The user", user.uid, " has left the channel");
  });

  useClientEvent(rtcClient, "user-published", (user, mediaType) => {
    console.log("The user", user.uid, " has published media in the channel");
  });

  const initRtm = async () => {
    await rtmClient.login({ uid: uid.toString(), token: rtmToken });
    rtmChannel
      .join()
      .then(() => console.log("Join success"))
      .catch((error) => console.log(error));

    await rtmClient.addOrUpdateLocalUserAttributes({
      name: userData?.user.name ?? "guest",
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
    console.log(membInfo);

    //await AgoraRTM.enableNotificationToChannelMembers(true);

    rtmChannel.on("ChannelMessage", (msg) => {
      console.log(msg);
    });

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
    // enableNotificationToChannelMembers
    // rtmChannel.on("AttributesUpdated" , (attr) => {
    //   console.log("Attributes update");
    // console.log(attr);
    // });
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

  if (isLoading) {
    return <div>Loading</div>;
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
              <div
                className="flex h-fit w-[200px] flex-col"
                key={remoteUser.uid}
              >
                <RemoteUserPlayer
                  user={remoteUser}
                  name={
                    rtmUsers.filter((user) => {
                      // console.log(`${user.uid} === ${remoteUser.uid} ${user.name}`);
                      return user.uid == remoteUser.uid;
                    })[0]?.name ?? "Not found"
                  }
                />
              </div>
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
