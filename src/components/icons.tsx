import Image from "next/image";
import { type FC } from "react";

interface IconProps {
  width?: number;
  className?: string;
}

export const GoogleIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/google.svg"}
      width={width ?? 50}
      height={100}
      alt="google icon"
      className={className ?? ""}
    />
  );
};

export const MicroOnIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/micro-on.svg"}
      width={width ?? 50}
      height={100}
      alt="micro on icon"
      className={className ?? ""}
    />
  );
};

export const MicroOffIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/micro-off.svg"}
      width={width ?? 50}
      height={100}
      alt="micro off icon"
      className={className ?? ""}
    />
  );
};

export const CameraOnIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/camera-on.svg"}
      width={width ?? 50}
      height={100}
      alt="camera on icon"
      className={className ?? ""}
    />
  );
};

export const CameraOffIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/camera-off.svg"}
      width={width ?? 50}
      height={100}
      alt="camera off icon"
      className={className ?? ""}
    />
  );
};

export const ExitIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/exit.svg"}
      width={width ?? 50}
      height={100}
      alt="exit"
      className={className ?? ""}
    />
  );
};

export const SunIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/sun.svg"}
      width={width ?? 50}
      height={100}
      alt="sun"
      className={className ?? ""}
    />
  );
};

export const MoonIcon: FC<IconProps> = ({ width, className }) => {
  return (
    <Image
      src={"/icon/moon.svg"}
      width={width ?? 50}
      height="0"
      alt="moon"
      className={className ?? "w-full h-auto"}
    />
  );
};
