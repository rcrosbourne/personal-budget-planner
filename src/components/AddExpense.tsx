import React from "react";
import BarChart from "./BarChart";
import { Plus, X } from "react-feather";
import { Budget } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import { getQueryKey } from "@trpc/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import useToast from "../hooks/useToast";

export default function AddExpense({
  budget,
  csrfToken,
}: {
  budget: Budget;
  csrfToken: string | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const findExpensesQuery = api.budget.findAllExpenses.useQuery(budget.id);
  const [totalExpenses, setTotalExpenses] = React.useState<number>(0);
  const [expenseAmounts, setExpenseAmounts] = React.useState<number[]>([]);
  React.useEffect(() => {
    if (findExpensesQuery.data) {
      const totalExpenses = findExpensesQuery.data.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      const expenseAmounts = findExpensesQuery.data.map((expense) => {
        return expense.amount;
      });
      setTotalExpenses(totalExpenses);
      setExpenseAmounts([...expenseAmounts]);
    }
  }, [findExpensesQuery.data]);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="max-h-[96px] max-w-[171px] rounded-md bg-secondary-yellow-500 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-thin">Expenses</span>
            <span className="text-sm font-bold">${totalExpenses}</span>
          </div>
          <div>
            <Dialog.Trigger asChild>
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-50">
                <Plus width={10} height={10} />
              </button>
            </Dialog.Trigger>
          </div>
        </div>
        <div className="mt-0.5">
          <BarChart values={expenseAmounts} />
        </div>
      </div>
      <Content open={open} budget={budget} csrfToken={csrfToken} />
    </Dialog.Root>
  );
}
const createExpenseSchema = z.object({
  occurrence: z.enum(["one-time", "monthly"]).default("monthly"),
  type: z.enum(["fixed", "variable"]).default("variable"),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  category: z
    .string()
    .trim()
    .min(2, { message: "Category must be at least 2 characters" }),
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .gt(0, { message: "Amount must be greater than 0" }),
  dueDate: z.string().trim().optional(),
  status: z.enum(["pending", "paid"]).default("pending"),
});
const Content = ({
  open,
  budget,
  csrfToken,
}: {
  open: boolean;
  budget: Budget;
  csrfToken: string | undefined;
}) => {
  const motionDivRef = React.useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const queryKey = getQueryKey(api.budget.findAllExpenses);
  const { showToast } = useToast();
  const createExpenseMutation = api.budget.addExpense.useMutation({
    onSuccess: async () => {
      // invalidate query
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(createExpenseSchema),
  });
  React.useEffect(() => {
    if (createExpenseMutation.isSuccess) {
      showToast({
        title: "Expense created",
        description: `Your expense has been created for the budget`,
        type: "success",
      });
      reset();
    }
  }, [createExpenseMutation.isSuccess, showToast]);
  const submitHandler = async (data: FieldValues) => {
    try {
      createExpenseMutation.mutate({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: data.name,
        category: data.category,
        budgetId: budget.id,
        amount: data.amount,
        dueDate: data.dueDate,
        status: data.status,
        occurrence: data.occurrence,
        type: data.type,
      });
    } catch (error) {
      setError("name", {
        type: "manual",
        message: "Failed create budget",
      });
      showToast({
        title: "Expense creation failure",
        description: "Failed to create expense due to unknown error",
        type: "error",
      });
    }
  };
  return (
    <AnimatePresence>
      {open ? (
        <Dialog.Portal forceMount>
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-30" />
          <Dialog.Content
            asChild
            className={`absolute inset-0 overflow-y-scroll rounded-md bg-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:top-1/4 md:mx-auto md:my-0 md:h-1/2 md:max-w-5xl`}
          >
            <Wrapper ref={motionDivRef}>
              <div className="flex items-center justify-between bg-primary-400 p-4">
                <div>
                  <Dialog.Title asChild>
                    <p className="text-2xl">Add Expense</p>
                  </Dialog.Title>
                </div>
                <div>
                  <div>
                    <Dialog.Close className="cursor-pointer p-2" asChild>
                      <button>
                        <X className="text-neutral-900" />
                        <span className="sr-only">Close menu</span>
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
              <div
                className="mt-4 p-4"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div>
                    <label htmlFor="occurrence" className="text-3xl">
                      Occurrence
                    </label>
                    <RadioGroup.Root
                      className="mt-4 grid grid-cols-2"
                      defaultValue="monthly"
                      aria-label="Expense Occurrence"
                      name="occurrence"
                    >
                      <div className="flex items-center">
                        <RadioGroup.Item
                          className="h-8 w-8 cursor-default rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-primary-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
                          value="monthly"
                          id="monthly"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-5 after:w-5 after:rounded-full after:bg-primary-500 after:content-['']" />
                        </RadioGroup.Item>
                        <label
                          className="pl-4 text-2xl leading-none"
                          htmlFor="monthly"
                        >
                          Monthly
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroup.Item
                          className="h-8 w-8 cursor-default rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-primary-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
                          value="one-time"
                          id="one-time"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-5 after:w-5 after:rounded-full after:bg-primary-500 after:content-['']" />
                        </RadioGroup.Item>
                        <label
                          className="pl-4 text-2xl leading-none"
                          htmlFor="one-time"
                        >
                          One-time
                        </label>
                      </div>
                    </RadioGroup.Root>
                  </div>

                  <div className="mt-10">
                    <label htmlFor="type" className="text-3xl">
                      Type
                    </label>
                    <RadioGroup.Root
                      className="mt-4 grid grid-cols-2"
                      defaultValue="variable"
                      aria-label="Expense Type"
                      name="expense-type"
                    >
                      <div className="flex items-center">
                        <RadioGroup.Item
                          className="h-8 w-8 cursor-default rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-primary-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
                          value="variable"
                          id="variable"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-5 after:w-5 after:rounded-full after:bg-primary-500 after:content-['']" />
                        </RadioGroup.Item>
                        <label
                          className="pl-4 text-2xl leading-none"
                          htmlFor="variable"
                        >
                          Variable
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroup.Item
                          className="h-8 w-8 cursor-default rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-primary-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
                          value="fixed"
                          id="fixed"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-5 after:w-5 after:rounded-full after:bg-primary-500 after:content-['']" />
                        </RadioGroup.Item>
                        <label
                          className="pl-4 text-2xl leading-none"
                          htmlFor="fixed"
                        >
                          Fixed
                        </label>
                      </div>
                    </RadioGroup.Root>
                  </div>
                  <div className="mt-10 flex flex-col">
                    <label htmlFor="name" className="text-3xl">
                      Name
                    </label>
                    <input
                      type="text"
                      className="mt-4"
                      id="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-secondary-red-500">
                        {errors.name?.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-10 flex flex-col">
                    <label htmlFor="category" className="text-3xl">
                      Category
                    </label>
                    <input
                      type="text"
                      className="mt-4"
                      id="category"
                      {...register("category")}
                    />
                    {errors.category && (
                      <span className="text-secondary-red-500">
                        {errors.category?.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-10 flex flex-col">
                    <label htmlFor="amount" className="text-3xl">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="mt-4"
                      id="amount"
                      {...register("amount")}
                    />
                    {errors.amount && (
                      <span className="text-secondary-red-500">
                        {errors.amount?.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-10 flex flex-col">
                    <label htmlFor="dueDate" className="text-3xl">
                      Date Due
                    </label>
                    <input
                      type="date"
                      className="mt-4"
                      id="dueDate"
                      {...register("dueDate")}
                    />
                    {errors.dueDate && (
                      <span className="text-secondary-red-500">
                        {errors.dueDate?.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-10">
                    <label htmlFor="type" className="text-3xl">
                      Status
                    </label>
                    <RadioGroup.Root
                      className="mt-4 grid grid-cols-2"
                      defaultValue="unpaid"
                      aria-label="Status"
                      name="expense-status"
                    >
                      <div className="flex items-center">
                        <RadioGroup.Item
                          className="h-8 w-8 cursor-default rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-primary-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
                          value="unpaid"
                          id="unpaid"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-5 after:w-5 after:rounded-full after:bg-primary-500 after:content-['']" />
                        </RadioGroup.Item>
                        <label
                          className="pl-4 text-2xl leading-none"
                          htmlFor="unpaid"
                        >
                          Unpaid
                        </label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroup.Item
                          className="h-8 w-8 cursor-default rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-primary-100 focus:shadow-[0_0_0_2px] focus:shadow-black"
                          value="paid"
                          id="paid"
                        >
                          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-5 after:w-5 after:rounded-full after:bg-primary-500 after:content-['']" />
                        </RadioGroup.Item>
                        <label
                          className="pl-4 text-2xl leading-none"
                          htmlFor="paid"
                        >
                          Paid
                        </label>
                      </div>
                    </RadioGroup.Root>
                  </div>
                  <div className="mt-10 flex items-center justify-around gap-4">
                    <button
                      type="submit"
                      className="group relative flex w-full justify-center rounded-md bg-primary-600 py-2 px-3 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      Add Expense
                    </button>
                    <button
                      type="button"
                      className="group relative flex w-full justify-center rounded-md bg-secondary-purple-600 py-2 px-3 text-sm font-semibold text-white hover:bg-secondary-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-purple-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Wrapper>
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </AnimatePresence>
  );
};
const Wrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.5,
      }}
      transition={{ duration: 0.3, type: "spring" }}
      // @ts-ignore
      ref={ref}
      {...props}
    >
      {props.children}
    </motion.div>
  );
});
