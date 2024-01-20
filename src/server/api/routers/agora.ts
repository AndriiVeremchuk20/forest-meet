import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import AgoraServices from "@/utils/agora";
import { TRPCError } from "@trpc/server";

export const agoraRouter = createTRPCRouter({
  createRoom: protectedProcedure.mutation(async ({ ctx: { db, session } }) => {
    // generate a channel name for future room
    const channelName = await AgoraServices.generateChannelName();

    // check if channel name is not exist
    const checkExist = await db.room.findUnique({ where: { channelName } });

    if (checkExist) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Server error",
      });
    }

    // add a new room into db
    const newRoom = await db.room.create({
      data: {
        creatorId: session.user.id,
        channelName,
      },
    });

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
    .mutation(async ({ input, ctx: { db } }) => {
      const { channelName } = input;

      // check room
      const checkRoom = await db.room.findUnique({ where: { channelName } });

      if (!checkRoom) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
      }

      const uid = AgoraServices.generateUid();
      const expireTime = 3600; // 1 hour

      const rtcToken = AgoraServices.token.rtc({
        uid,
        channelName,
        expireTime,
      });

      const rtmToken = AgoraServices.token.rtm({
        uid: uid.toString(),
        expireTime,
      });

      return {
        channelName,
        uid,
        token: {
          rtc: rtcToken,
          rtm: rtmToken,
        },
      };
    }),
});
