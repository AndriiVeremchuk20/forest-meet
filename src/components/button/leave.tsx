import {
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
  useRTCClient,
} from "agora-rtc-react";
import { useRouter } from "next/navigation";
import { ExitIcon } from "../icons";
import { type FC } from "react";
import { useUserMedia } from "@/hooks/user-media";

interface LeaveButtonProps {
  cameraTrack: ICameraVideoTrack | null;
  microphoneTrack: IMicrophoneAudioTrack | null;
}

export const LeaveButton: FC<LeaveButtonProps> = ({
  cameraTrack,
  microphoneTrack,
}) => {
  const client = useRTCClient();
  const router = useRouter();

  const { isLoading, media } = useUserMedia({ video: true, audio: false });

  const onLeaveClick = async () => {
    await client.leave();
    cameraTrack?.close();
    microphoneTrack?.close();
    router.replace("/meet/ended/");
    media?.getTracks().forEach((track) => track.stop());
  };

  return (
    <button onClick={onLeaveClick} className="w-full hover:opacity-80">
      <ExitIcon className="w-3/5" />
    </button>
  );
};
