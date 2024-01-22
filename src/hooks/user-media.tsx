import { useQuery } from "@tanstack/react-query";

interface UseUserMediaParams {
  audio: boolean;
  video: boolean;
}

export const useUserMedia = (conf: UseUserMediaParams) => {
  const userMedia = useQuery(
    ["user-media", conf.video],
    () =>
      navigator.mediaDevices.getUserMedia({
        audio: conf.audio,
        video: conf.video,
      }),
    {
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return { media: userMedia.data, isLoading: userMedia.isLoading };
};
