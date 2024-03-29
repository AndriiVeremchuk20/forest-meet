import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import AgoraApi from "@/services/agora";
import { env } from "@/env";
import AgoraChannelManager from "@/utils/agora-channel-manager";

export const agoraRouter = createTRPCRouter({
  createRoom: protectedProcedure.mutation(async ({ ctx: { db, session } }) => {
    /* --- CHECK USER UID --- */
    const { id, uid } = session.user;
    //console.log(uid);

    if (!uid) {
      const newUid = AgoraChannelManager.generateUid().toString();
      await db.user.update({
        where: { id },
        data: { uid: newUid },
      });
      //console.log(updateUser);
    }

    // generate channel name to future room
    const channelName = AgoraChannelManager.generateChannelName();

    // check if channel name is not exist
    const checkExist = await db.room.findUnique({ where: { channelName } });

    if (checkExist) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Server error",
      });
    }

    // add created room into db
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
      const channelInfo = await AgoraApi.getChannelInfo(channelName);
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

      /* --- TOKEN GENERATIONS --- */

      const uid = session?.user.uid
        ? Number(session.user.uid)
        : AgoraChannelManager.generateUid();

      const expireTime = 3600; // 1 hour

      const rtcToken = AgoraChannelManager.generateRtcToken({
        uid,
        channelName,
        expireTime,
      });

      const rtmToken = AgoraChannelManager.generateRtmToken({
        uid: uid.toString(),
        expireTime,
      });

      return {
        cname: channelName,
        uid,
        token: {
          rtc: rtcToken,
          rtm: rtmToken,
        },
        isCreator: checkChannel.creatorId === session?.user.id,
      };
    }),

  deleteRoom: protectedProcedure
    .input(
      z.object({
        channelName: z.string(),
      }),
    )
    .mutation(async ({ input: { channelName }, ctx: { db, session } }) => {
      /* --- SEARCH ROOM IN DB --- */

      // search room in db
      const room = await db.room.findUnique({ where: { channelName } });

      // check room
      if (!room) {
        console.log("Room not found");
        throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
      }

      // check creator
      if (room.creatorId !== session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" });
      }

      /* ---  KICK ALL USERS FROM CHANEL THEN DELETE ROOM FROM DB --- */

      // get all users in room
      const channelInfo = await AgoraApi.getChannelInfo(channelName);

      // kick all users
      if (channelInfo?.data.users) {
        await Promise.all(
          channelInfo.data.users.map(async (uid) => {
            await AgoraApi.kickUserPrivileges({
              uid,
              cname: channelName,
              privileges: ["join_channel"],
            });
          }),
        );
      }

      // delete room from db
      await db.room.delete({ where: { channelName } });
    }),

  kickUserFromRoom: protectedProcedure
    .input(z.object({ cname: z.string(), uid: z.number() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { cname, uid } = input;

      /* --- CHECK DATA --- */

      // get data from db
      const roomDb = await db.room.findUnique({
        where: { channelName: cname },
      });

      // check room exist
      if (!roomDb) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Room not found" });
      }

      // check creator
      if (roomDb.creatorId !== session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" });
      }

      /* --- KICK USER --- */

      // try to kick user
      const result = await AgoraApi.kickUserPrivileges({
        uid,
        cname,
        privileges: ["join_channel"],
      });

      return {
        success: result,
      };
    }),
  checkChannelName: publicProcedure
    .input(z.object({ cname: z.string() }))
    .mutation(async ({ input, ctx: { db } }) => {
      const { cname } = input;
      const checkChannel = await db.room.findUnique({
        where: { channelName: cname },
      });

      return !!checkChannel;
    }),
});
