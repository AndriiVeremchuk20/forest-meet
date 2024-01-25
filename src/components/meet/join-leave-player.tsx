import type { FC, RefObject } from "react";

interface JoinLeavePlayerProps {
  joinAudioRef: RefObject<HTMLAudioElement>;
  leaveAudioRef: RefObject<HTMLAudioElement>;
}

export const JoinLeavePlayer: FC<JoinLeavePlayerProps> = ({
  joinAudioRef,
  leaveAudioRef,
}) => {
  return (
    <>
      <audio ref={joinAudioRef} preload="auto" className="hidden">
        <source src="/audio/join_sound.mp3" type="audio/mp3" />
      </audio>
      <audio
        ref={leaveAudioRef}
        src="/audio/leave_sound.mp3"
        preload="auto"
        className="hidden"
      >
        <source src="/audio/leave_sound.mp3" type="audio/mp3" />
      </audio>
    </>
  );
};
