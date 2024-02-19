import { useRouter } from "next/navigation";
import { Button } from "../common";
import { BackIcon } from "../svgs";

export const BackButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <Button onClick={onClick}>
      <span className="flex items-center space-x-2">
        <BackIcon className="h-[14px] w-[30px]" /> Back
      </span>
    </Button>
  );
};
