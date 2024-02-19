import { useRouter } from "next/navigation";
import { ExitIcon } from "../svgs";
import { type FC } from "react";
//import { useUserMedia } from "@/hooks/user-media";

interface LeaveButtonProps {
  onClick: () => void;
}

export const LeaveButton: FC<LeaveButtonProps> = () => {
  const router = useRouter();

  //const { isLoading, media } = useUserMedia({ video: true, audio: false });

  const onLeaveClick = async () => {
    //onClick();
    //if (!isLoading) {
    //  media?.getTracks().forEach((track) => track.stop());
    // }

    router.replace("/meet/end/");
  };

  return (
    <button
      onClick={onLeaveClick}
      className="flex w-full items-center justify-center hover:opacity-80"
    >
      <ExitIcon className="h-[70px] w-[100px]" />
    </button>
  );
};
