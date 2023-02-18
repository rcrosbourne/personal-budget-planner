import { z } from "zod";
import { hash } from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().trim().email({ message: "Invalid email" }),
        name: z.string().trim().min(2, { message: "Name is required" }),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // validate password and passwordConfirm
      const newUserOutputSchema = z.object({
        email: z.string(),
        name: z.string(),
        id: z.string(),
      });
      return await ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: await hash(input.password, 10),
        },
      });
    }),
});
