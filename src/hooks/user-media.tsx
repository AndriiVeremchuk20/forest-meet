import { useQuery } from "@tanstack/react-query";

export const useUserMedia = (conf: { audio: boolean; video: boolean }) => {
  const userMedia = useQuery(
    ["user-media", conf.video, conf.audio],
    async () =>
      await navigator.mediaDevices.getUserMedia({
        audio: conf.audio,
        video: conf.video,
      }),
    {
      enabled: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  if (userMedia.isError) {
    return { media: null, isLoading: false };
  }

  return { media: userMedia.data, isLoading: userMedia.isLoading };
};
