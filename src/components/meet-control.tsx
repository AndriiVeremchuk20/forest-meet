import {
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { type FC } from "react";
import { ToggleAudioButton, ToggleVideoButton } from "./button/media-control";
import LeaveButton from "./button/leave";

interface MeetControlProps {
  videoTrack: ICameraVideoTrack | null;
  audioTrack: IMicrophoneAudioTrack | null;
}

const MeetControl: FC<MeetControlProps> = ({ audioTrack, videoTrack }) => {
  return (
    <div className="w-full flex justify-center">
	<div className="w-2/6 grid grid-cols-3">
      <ToggleVideoButton track={videoTrack} />
      <ToggleAudioButton track={audioTrack} />
      <LeaveButton/>
	</div>
    </div>
  );
};

export default MeetControl;
