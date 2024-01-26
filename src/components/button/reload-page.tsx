import { useRouter } from "next/navigation";
import { Button } from "../common";

export const ReloadPageButton = () => {
  const router = useRouter();

  const onReloadClick = () => {
    router.refresh();
  };

  return <Button onClick={onReloadClick}>Reload</Button>;
};
