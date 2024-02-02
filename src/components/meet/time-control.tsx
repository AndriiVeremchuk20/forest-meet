import { type ReactNode, useEffect, useState } from "react";
import { HeartIcon } from "../icons";
import { useRTCClient } from "agora-rtc-react";

const TimeControl = ({ children }: { children: ReactNode }) => {
  const rtcClient = useRTCClient();

  const [duration, setDuration] = useState<number>(
    3600,
  );

  const countDuration = () => {
    const numHearts = Math.floor(duration / 60 / 10);

    const hearts = [];

    for (let i = 0; i < numHearts; i++) {
      hearts.push(<HeartIcon key={i} className="w-[30px]" />);
    }

    return hearts;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(3600 - rtcClient.getRTCStats().Duration);
	  console.log(3600 - rtcClient.getRTCStats().Duration);
	}, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="absolute laptop:right-10 laptop:top-10 phone:right-5 phone:top-5 flex space-x-1">
        {countDuration()}
      </div>
      {children}
    </>
  );
};

export default TimeControl;
