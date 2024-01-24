import { useSearchParams } from "next/navigation";

export const useRoomId = (): string | null => {
  const params = useSearchParams();
  const roomId = params.get("id");

  return roomId ?? null;
};
