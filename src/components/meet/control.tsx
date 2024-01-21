import {
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { type FC } from "react";
import { ToggleAudioButton, ToggleVideoButton } from "../button/media-control";
import LeaveButton from "../button/leave";

interface MeetControlProps {
  videoTrack: ICameraVideoTrack | null;
  audioTrack: IMicrophoneAudioTrack | null;
}

const MeetControl: FC<MeetControlProps> = ({ audioTrack, videoTrack }) => {
  return (
    <div className="flex w-full justify-center border-t-2 border-neutral-600 py-2 backdrop-blur-md">
      <div className="grid grid-cols-3 phone:w-full tablet:w-3/5 desktop:w-2/6">
        <ToggleVideoButton track={videoTrack} />
        <ToggleAudioButton track={audioTrack} />
        <LeaveButton cameraTrack={videoTrack} microphoneTrack={audioTrack} />
      </div>
    </div>
  );
};

export default MeetControl;
