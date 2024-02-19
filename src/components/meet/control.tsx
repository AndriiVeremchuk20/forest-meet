"use client"

import { type FC } from "react";
import { ToggleAudioButton, ToggleCameraButton } from "../button/media-control";
import { LeaveButton } from "../button";

interface MeetControlProps {
  onLeaveClick: () => void;
}

const MeetControl: FC<MeetControlProps> = ({ onLeaveClick }) => {
  return (
    <div className="flex w-full justify-center border-t-2 border-neutral-600 py-2 backdrop-blur-md">
      <div className="grid grid-cols-3 phone:w-full tablet:w-3/5 desktop:w-2/6">
        <ToggleCameraButton />
        <ToggleAudioButton />
        <LeaveButton onClick={onLeaveClick} />
      </div>
    </div>
  );
};

export default MeetControl;
