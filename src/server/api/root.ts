import { createTRPCRouter } from "@/server/api/trpc";
import { agoraRouter } from "./routers/agora";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  agora: agoraRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
