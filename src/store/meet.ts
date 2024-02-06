/*
 * Store to save meet credentials 
 */

import { create } from "zustand";

interface MeetCredentials {
	creatorId: string;
	uid: number;
	cname: string;
	token: {
		rtc: string,
		rtm: string,
	}
}


interface ThemeState {
  meetCredentials: MeetCredentials|null;
  setMeetCredentials: (value: MeetCredentials) => void;
}

export const useMeetStore = create<ThemeState>()(
    (set) => ({
      meetCredentials: null,
      setMeetCredentials: (value: MeetCredentials) => set({ meetCredentials: value }),
    }) 
);
