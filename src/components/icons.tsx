import Image from "next/image";
import { type FC } from "react";

interface IconProps {
  width?: number;
}

export const GoogleIcon: FC<IconProps> = ({ width }) => {
  return (
    <Image
      src={"/icon/google.svg"}
      width={width ?? 50}
      height={100}
      alt="google icon"
    />
  );
};

export const MicroOnIcon: FC<IconProps> = ({ width }) => {
  return (
    <Image
      src={"/icon/micro-on.svg"}
      width={width ?? 50}
      height={100}
      alt="micro on icon"
    />
  );
};

export const MicroOffIcon: FC<IconProps> = ({ width }) => {
  return (
    <Image
      src={"/icon/micro-off.svg"}
      width={width ?? 50}
      height={100}
      alt="micro off icon"
    />
  );
};

export const CameraOnIcon: FC<IconProps> = ({ width }) => {
  return (
    <Image
      src={"/icon/camera-on.svg"}
      width={width ?? 50}
      height={100}
      alt="camera on icon"
    />
  );
};

export const CameraOffIcon: FC<IconProps> = ({ width }) => {
  return (
    <Image
      src={"/icon/camera-off.svg"}
      width={width ?? 50}
      height={100}
      alt="camera off icon"
    />
  );
};
