import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import channelNameGenerator from "@/utils/agora/channel-name-generator";
import { generateAgoraTokenByUid } from "@/utils/agora/generate-token";

export const agoraRouter = createTRPCRouter({
  createRoom: publicProcedure.mutation(async () => {
    const channelName = await channelNameGenerator();
    console.log(channelName);
    const uid = Math.floor(Math.random() * 1000000);
    const role = "publisher";
    const expireTime = 3600; // 1 hour

    const { token } = generateAgoraTokenByUid({
      channelName,
      uid,
      role,
      expireTime,
    });

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
      const role = "publisher";
      const { token } = generateAgoraTokenByUid({
        channelName,
        uid,
        role,
        expireTime,
      });

      return {
        channelName,
        uid,
        token,
      };
    }),
});
