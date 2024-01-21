import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      setIsDark: (value) => set({ isDark: value }),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
