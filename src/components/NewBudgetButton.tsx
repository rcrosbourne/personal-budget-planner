import React from "react";
import { PlusCircle, X } from "react-feather";
import { api } from "../utils/api";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useToast from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import button from "./Button";
import Dialog from "./Dialog";

const createBudgetSchema = z.object({
  period: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, "Invalid date"),
});

export default function NewBudgetButton({
  csrfToken,
}: {
  csrfToken: string | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const queryKey = getQueryKey(api.budget.findAll);
  const { showToast } = useToast();
  const createBudgetMutation = api.budget.create.useMutation({
    onSuccess: async () => {
      // invalidate query
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(createBudgetSchema),
  });
  React.useEffect(() => {
    if (createBudgetMutation.isSuccess) {
      const period = new Date(createBudgetMutation.data.period);
      period.setMinutes(period.getMinutes() + period.getTimezoneOffset());
      // Convert period into Month Year format
      // Remove timezone offset effect
      let month = period.toLocaleString("default", { month: "long" });
      let year = period.getFullYear();
      showToast({
        title: "Budget created",
        description: `Your budget has been created for the month of ${month} ${year}`,
        type: "success",
      });
      setOpen(false);
    }
  }, [createBudgetMutation.isSuccess, setOpen]);

  const submitHandler = async (data: FieldValues) => {
    try {
      createBudgetMutation.mutate({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        period: data.period,
      });
    } catch (error) {
      setError("period", {
        type: "manual",
        message: "Failed create budget",
      });
      showToast({
        title: "Budget creation failure",
        description: "Failed create budget due to unknown error",
        type: "error",
      });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        setOpen={setOpen}
        trigger={
          <button className="flex items-center justify-around rounded-md border border-transparent bg-primary-500 px-8 py-5 text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <PlusCircle size={30} />
            <span className="text-2xl">New</span>
          </button>
        }
        title={<p className="text-2xl">Create New Budget</p>}
        closeButton={
          <button>
            <X className="text-neutral-900" />
            <span className="sr-only">Close menu</span>
          </button>
        }
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label htmlFor="period">Date</label>
            <input type="date" {...register("period")} />
            {errors.period && (
              <span className="text-secondary-red-500">
                {errors.period?.message?.toString()}
              </span>
            )}
            {createBudgetMutation.isError && (
              <span className="text-secondary-red-500">
                {createBudgetMutation.error?.message}
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              disabled={createBudgetMutation.isLoading}
              className="rounded-md bg-primary-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              type="submit"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-primary-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
