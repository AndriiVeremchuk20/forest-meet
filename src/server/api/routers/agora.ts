import { z } from "zod";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

export const agoraRouter = createTRPCRouter({
  generateToken: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
        uid: z.number().nullable(),
        role: z.union([z.literal("publisher"), z.literal("audience")]),
        expireTime: z.number().default(3600),
      }),
    )
    .query(({ input }) => {
      const { channelName, uid, role, expireTime } = input;

      if (!uid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "uid is required",
        });
      }

      const currentTime: number = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expireTime;

      const token = RtcTokenBuilder.buildTokenWithUid(
        env.NEXT_PUBLIC_AGORA_APP_ID,
        env.AGORA_APP_CERTIFICATE,
        channelName,
        uid,
        role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER,
        privilegeExpireTime,
      );

      return {
        token,
      };
    }),
});
