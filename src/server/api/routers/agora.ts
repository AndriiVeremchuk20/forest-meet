import { z } from "zod";
import { RtcTokenBuilder, RtcRole } from "agora-token";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

export const agoraRouter = createTRPCRouter({
  generateToken: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
        uid: z.string(),
        role: z.union([z.literal("publisher"), z.literal("audience")]),
        expireTime: z.number().default(3600),
      }),
    )
    .mutation(({ input }) => {
      const { channelName, uid, role, expireTime } = input;

      // get agora project credentials from env
      const appId = env.NEXT_PUBLIC_AGORA_APP_ID;
      const appCertificate = env.AGORA_APP_CERTIFICATE;

      //calculate privilege expire time
      const currentTime: number = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expireTime;

      // check uid
      if (!uid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "uid is required",
        });
      }

      // convert role to RtcRole
      const rtcRole =
        role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

      // generate token by uid
      const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        Number(uid),
        rtcRole,
        expireTime,
        privilegeExpireTime,
      );

      return {
        token,
        channelName,
      };
    }),
});
