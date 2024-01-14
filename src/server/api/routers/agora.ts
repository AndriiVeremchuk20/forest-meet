import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import AgoraServices from "@/utils/agora";

export const agoraRouter = createTRPCRouter({
  createRoom: publicProcedure.mutation(async () => {
    const channelName = await AgoraServices.generateChannelName();
    const uid = AgoraServices.generateUid();
    const expireTime = 3600; // 1 hour

    const token = AgoraServices.generateRtcToken({
      uid,
      channelName,
      expireTime,
    });

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
