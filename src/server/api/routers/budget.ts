import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const budgetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ period: z.string().trim() }))
    .mutation(async ({ input, ctx }) => {
      const newBudgetOutputSchema = z.object({
        id: z.string(),
        period: z.coerce.date(),
      });
      // check if a budget already exists for this month
      const periodAsDate = new Date(input.period);
      let firstDay = new Date(
        periodAsDate.getFullYear(),
        periodAsDate.getMonth(),
        1
      );
      let lastDay = new Date(
        periodAsDate.getFullYear(),
        periodAsDate.getMonth() + 1,
        0
      );
      const existingBudget = await ctx.prisma.budget.findFirst({
        where: {
          period: {
            gte: firstDay,
            lte: lastDay,
          },
          userId: ctx.session.user.id,
        },
      });
      if (existingBudget) {
        throw new Error("Budget already exists for this month");
      }
      firstDay.setMinutes(firstDay.getMinutes() + firstDay.getTimezoneOffset());
      const budgetFromDb = await ctx.prisma.budget.create({
        data: {
          period: firstDay,
          userId: ctx.session.user.id,
        },
      });
      return newBudgetOutputSchema.parse(budgetFromDb);
    }),
  findAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.budget.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
