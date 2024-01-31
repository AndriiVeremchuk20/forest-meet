import { createTRPCRouter } from "@/server/api/trpc";
import { agoraRouter } from "./routers/agora";
import { donateRouter } from "./routers/donate";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  agora: agoraRouter,
  donate: donateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
