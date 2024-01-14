import { create } from "zustand";

interface User {
  uid: number;
  channelName: string;
  token: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: User | null) => {
    set((state) => ({ ...state, user }));
  },
}));
