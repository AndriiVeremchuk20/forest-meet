import { type IAgoraRTCRemoteUser } from "agora-rtc-react";
import { type FC } from "react";
import RemoteUserPlayer from "./palyer/remote-user";

interface RemoteUsersGridProps {
  remoteUsers: IAgoraRTCRemoteUser[];
  names: Record<number, string>;
}

export const RemoteUsersGrid: FC<RemoteUsersGridProps> = ({
  remoteUsers,
  names,
}) => {
  return (
    <div className="grid w-full grid-flow-col-dense gap-3">
      {/*remoteUsers.map((remoteUser) => (
        <RemoteUserPlayer
          key={remoteUser.uid}
          user={remoteUser}
          name={names[Number(remoteUser.uid.toString())] ?? "No name"}
        />
      ))*/}
    </div>
  );
};
