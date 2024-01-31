import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
export const donateRouter = createTRPCRouter({
  createDonate: publicProcedure.mutation(async ({ ctx: { db, session } }) => {
    const t = "d";

    return t;
  }),

  approveDonate: publicProcedure.mutation(async ({ ctx: { db, session } }) => {
    const d = "d";

    return d;
  }),
});
