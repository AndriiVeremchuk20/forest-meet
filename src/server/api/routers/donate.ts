import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import BMC from "@/services/buy-me-coffe";
export const donateRouter = createTRPCRouter({
  getSupportesr: publicProcedure.query(async ({ ctx: { db, session } }) => {
    const supporters = await BMC.getAllSupporters();

    //const supportersEmails = supporters.map(({ payer_email }) => payer_email);

    //check payers email's in db to get avatars;

    return supporters.map(({ support_id, support_note, supporter_name }) => ({
      id: support_id,
      name: supporter_name,
      message: support_note,
    }));
  }),
});
