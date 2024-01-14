import { useRTCClient } from "agora-rtc-react";
import { useRouter } from "next/navigation";

const LeaveButton = () => {
  const client = useRTCClient();
  const router = useRouter();

  const onLeaveClick = async () => {
    await client.leave();
    router.replace("/meet/lobby/");
  };

  return (
    <button onClick={onLeaveClick} className="h-[30px] w-[100px] bg-red-500">
      Leave
    </button>
  );
};

export default LeaveButton;
