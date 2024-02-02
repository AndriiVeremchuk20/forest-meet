import { useRouter } from "next/navigation";
import { Button } from "../common";

export const BackButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return <Button onClick={onClick}>Back</Button>;
};
