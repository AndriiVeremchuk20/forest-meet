import { useRTCClient } from "agora-rtc-react";
import { useRouter } from "next/navigation";
import { ExitIcon } from "../icons";

const LeaveButton = () => {
  const client = useRTCClient();
  const router = useRouter();

  const onLeaveClick = async () => {
    await client.leave();
    router.replace("/meet/lobby/");
  };

  return (
    <button onClick={onLeaveClick} className="w-full hover:opacity-80">
      <ExitIcon className="w-3/5" />
    </button>
  );
};

export default LeaveButton;
