import { type ReactNode, useEffect, useState } from "react";
import { HeartIcon } from "../svgs";
import { useRTCClient } from "agora-rtc-react";

const TimeControl = ({ children }: { children: ReactNode }) => {
  const rtcClient = useRTCClient();

  const [duration, setDuration] = useState<number>(3600);

  const countDuration = () => {
    const numHearts = Math.floor(duration / 60 / 10);

    const hearts = [];

    for (let i = 0; i < numHearts; i++) {
      hearts.push(<HeartIcon key={i} width={30} height={30} />);
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
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="absolute flex space-x-1 phone:right-5 phone:top-5 laptop:right-10 laptop:top-10">
        {countDuration()}
      </div>
      {children}
    </>
  );
};

export default TimeControl;
