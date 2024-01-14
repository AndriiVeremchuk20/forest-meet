import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import channelNameGenerator from "@/utils/agora/channel-name-generator";
import { TRPCError } from "@trpc/server";
import {generateAgoraRtcTokenByUid} from "@/utils/agora/generate-rtc-token";


export const agoraRouter = createTRPCRouter({
  createRoom: publicProcedure.mutation(async () => {
    const channelName = await channelNameGenerator();
    console.log(channelName);
    const uid = Math.floor(Math.random() * 100000);
    const expireTime = 3600; // 1 hour

    const {token} = generateAgoraRtcTokenByUid({ uid, channelName, expireTime });

    if (!token) {
      throw new TRPCError({ message: "invalid token", code: "BAD_REQUEST" });
    }

    return {
      channelName,
      uid,
      token,
    };
  }),
  joinToRoom: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const { channelName } = input;

      const uid = Math.floor(Math.random() * 10000);
      const expireTime = 3600; // 1 hour
      
	   const {token} = generateAgoraRtcTokenByUid({ uid, channelName, expireTime });


      return {
        channelName,
        uid,
        token,
      };
    }),
});
