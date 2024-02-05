import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import AgoraServices from "@/utils/agora";
import { TRPCError } from "@trpc/server";
import { getChannelInfo } from "@/services/agora";
import { env } from "@/env";

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
    await db.room.create({
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
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { AGORA_MAX_USERS_IN_CHANNEL } = env;

      const { channelName } = input;

      // get agora channel info
      const channelInfo = await getChannelInfo(channelName);
      //console.log(channelInfo);

      // get room from db
      const checkChannel = await db.room.findUnique({ where: { channelName } });
	  //console.log(checkChannel);

      // check chanel in db
      if (!checkChannel || !channelInfo) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
      }

      // check room capacity
      if (channelInfo.data.total >= AGORA_MAX_USERS_IN_CHANNEL) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Room is full" });
      }

      // check organizator is connected
      if (
        !channelInfo.data.channel_exist &&
        session?.user.id !== checkChannel.creatorId
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Organizator not connected",
        });
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
        creatorId: checkChannel.creatorId,
      };
    }),

  deleteRoom: protectedProcedure
    .input(
      z.object({
        channelName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      console.log("Delete");
    }),
});
