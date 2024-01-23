import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MediaControlState {
  enabledCamera: boolean;
  enabledMicro: boolean;
  setEnabledCamera: (value: boolean) => void;
  setEnabledMicro: (value: boolean) => void;
}

export const useMediaControlStore = create<MediaControlState>()(
  persist(
    (set) => ({
      enabledCamera: true,
      enabledMicro: true,
      setEnabledCamera: (value) => set({ enabledCamera: value }),
      setEnabledMicro: (value) => set({ enabledMicro: value }),
    }),
    {
      name: "media-control",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
