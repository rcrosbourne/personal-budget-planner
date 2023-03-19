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
  findAllExpenses: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      let budget = await ctx.prisma.budget.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: input,
        },
      });
      if (!budget) {
        throw new Error("Budget not found");
      }
      return await ctx.prisma.expense.findMany({
        where: {
          budgetId: input,
        },
      });
    }),
  addExpense: protectedProcedure
    .input(
      z.object({
        budgetId: z.string(),
        amount: z.number(),
        occurrence: z.enum(["one-time", "monthly"]).default("monthly"),
        type: z.enum(["fixed", "variable"]).default("variable"),
        name: z.string(),
        dueDate: z.string().optional(),
        category: z.string(),
        status: z.enum(["pending", "paid"]).default("pending"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let budget = await ctx.prisma.budget.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: input.budgetId,
        },
      });
      if (!budget) {
        throw new Error("Budget not found");
      }
      return await ctx.prisma.expense.create({
        data: {
          amount: input.amount,
          name: input.name,
          occurrence: input.occurrence,
          type: input.type,
          status: input.status,
          category: input.category,
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
          budget: {
            connect: {
              id: input.budgetId,
            },
          },
        },
      });
    }),
});
