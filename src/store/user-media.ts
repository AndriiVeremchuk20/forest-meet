import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserMedia {
  video: boolean;
  audio: boolean;
}

interface UserMediaState {
  media: UserMedia;
  setVideo: (video: boolean) => void;
  setAudio: (audio: boolean) => void;
}

const defaultUserMediaValue: UserMedia = {
  video: true,
  audio: true,
};

export const useUserMediaStore = create<UserMediaState>()(
  persist(
    (set) => ({
      media: defaultUserMediaValue,
      setVideo: (video: boolean) => set((s) => ({ ...s, video })),
      setAudio: (audio: boolean) => set((s) => ({ ...s, audio })),
    }),
    {
      name: "user-media-device-chooise",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
