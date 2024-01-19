import { type IAgoraRTCRemoteUser } from "agora-rtc-react";
import { type FC } from "react";
import RemoteUserPlayer from "./palyer/remote-user";

interface RemoteUsersCircleProps {
  remoteUsers: IAgoraRTCRemoteUser[]; //number[];
}

const RemoteUsersCircle: FC<RemoteUsersCircleProps> = ({ remoteUsers }) => {
  const polarToCartesian = (
    angle: number,
    radiusX: number,
    radiusY: number,
  ) => {
    const radians = (angle * Math.PI) / 180;
    const x = radiusX * Math.cos(radians);
    const y = radiusY * Math.sin(radians);
    return { x, y };
  };

  const radiusX = 350;
  const radiusY = 250;

  return (
    <div className="relative h-[800px] w-full">
      {remoteUsers.map((remoteUser, index) => {
        const angle = (360 / remoteUsers.length) * index;
        const { x, y } = polarToCartesian(angle, radiusX, radiusY);
        const style: React.CSSProperties = {
          position: "absolute",
          top: `calc(50% - 100px + ${y}px)`, // Adjusted for a better centering
          left: `calc(50% - 100px + ${x}px)`, // Adjusted for a better centering
        };

        return (
          <div
            className="h-[130px] w-[130px]"
            key={remoteUser.uid}
            style={style}
          >
            {/* Assuming RemoteUserPlayer is imported */}
            {<RemoteUserPlayer user={remoteUser} />}
          </div>
        );
      })}
    </div>
  );
};

export default RemoteUsersCircle;
