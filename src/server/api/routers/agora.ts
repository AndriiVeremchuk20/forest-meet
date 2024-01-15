import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import AgoraServices from "@/utils/agora";

export const agoraRouter = createTRPCRouter({
  createRoom: publicProcedure.mutation(async () => {
    // just generate a channel name for future room
    const channelName = await AgoraServices.generateChannelName();

    return {
      channelName,
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

      const uid = AgoraServices.generateUid();
      const expireTime = 3600; // 1 hour

      const token = AgoraServices.generateRtcToken({
        uid,
        channelName,
        expireTime,
      });

      return {
        channelName,
        uid,
        token,
      };
    }),
});
