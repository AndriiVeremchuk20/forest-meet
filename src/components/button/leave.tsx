import { useRouter } from "next/navigation";
import { Exit } from "../svgs";
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

    router.replace("/meet/ended/");
  };

  return (
    <button onClick={onLeaveClick} className="w-full hover:opacity-80">
      <Exit className="w-[100px] h-[70px]" />
    </button>
  );
};
