import { z } from "zod";
import { RtcTokenBuilder, RtcRole } from "agora-token";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import channelNameGenerator from "@/utils/agora/channel-name-generator";
import {generateAgoraTokenByUid} from "@/utils/agora/generate-token";

export const agoraRouter = createTRPCRouter({
 createRoom: publicProcedure.mutation(async()=>{

	 const channelName = await channelNameGenerator();
	 console.log(channelName);
	 const uid = Math.floor(Math.random() * 10000);
	 const role = "publisher";
	 const expireTime = 3600; // 1 hour

	 const {token} = generateAgoraTokenByUid({channelName, uid, role, expireTime });

	 return {
		channelName,
		uid,
		token
	 }

 }), 
 generateToken: publicProcedure
    .input(
      z.object({
        channelName: z.string(),
        role: z.union([z.literal("publisher"), z.literal("audience")]),
        expireTime: z.number().default(3600),
      }),
    )
    .mutation(({ input }) => {
      const { channelName, role, expireTime } = input;

      // get agora project credentials from env
      const appId = env.NEXT_PUBLIC_AGORA_APP_ID;
      const appCertificate = env.AGORA_APP_CERTIFICATE;

      //calculate privilege expire time
      const currentTime: number = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expireTime;

      const uid = Math.floor(Math.random() * 10000);

      // convert role to RtcRole
      const rtcRole =
        role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

      // generate token by uid
      const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        rtcRole,
        expireTime,
        privilegeExpireTime,
      );

      return {
        token,
        channelName,
        uid,
      };
    }),
});
