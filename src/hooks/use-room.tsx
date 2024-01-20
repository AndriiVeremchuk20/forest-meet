import { useSearchParams } from "next/navigation";

const useRoom = (): string | null => {
  const params = useSearchParams();
  const roomId = params.get("id");

  return roomId ?? null;
};

export default useRoom;
