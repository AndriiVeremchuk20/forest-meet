import {type FC, useRef, useEffect} from "react";


interface JoinLeavePlayerProps{
	onJoin: ()=>void;
	onLeave: ()=>void;
}

export const JoinLeavePlayer: FC<JoinLeavePlayerProps> = ({onJoin, onLeave}) => {
 const joinAudioRef = useRef<HTMLAudioElement|null>(null);
 const leaveAudioRef = useRef<HTMLAudioElement|null>(null);

 // useEffect to handle onJoin call
 useEffect(()=>{
	if(joinAudioRef.current){
		joinAudioRef.current.play().catch(error=>console.log(error));
	}
 },[onJoin]);

 return (
    <>
      <audio ref={joinAudioRef} controls preload="auto">
        <source src="/audio/join_caw_sound.mp3" type="audio/mp3" />
      </audio>
      <audio ref={leaveAudioRef} controls src="/audio/leave-whoosh.mp3" preload="auto">
        <source src="/audio/leave-whoosh.mp3" type="audio/mp3" />
      </audio>
    </>
  );
};
