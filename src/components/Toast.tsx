import React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { AlertCircle, CheckCircle, Info, X } from "react-feather";
import classNames from "classnames";

type ToastType = "success" | "error" | "info";
export default function Toast(
  {
    title,
    description,
    type = "success",
    openToast,
    setOpenToast,
    ...delegated
  }: {
    title: string;
    description: string;
    type: ToastType;
    openToast: boolean;
    setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
    delegated?: {};
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <React.Fragment>
      <RadixToast.Root
        className={classNames(
          "data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md p-[15px]" +
            " shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]" +
            " data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
          {
            "bg-secondary-blue-100 text-neutral-900": type === "info",
            "bg-primary-100 text-neutral-900": type === "success",
            "bg-secondary-red-400 text-black": type === "error",
          }
        )}
        open={openToast}
        onOpenChange={setOpenToast}
        {...delegated}
      >
        <div
          className={`col-span-full flex w-full max-w-[350px] items-center justify-between gap-3`}
        >
          <div>
            {type === "success" && <CheckCircle />}
            {type === "info" && <Info />}
            {type === "error" && <AlertCircle />}
          </div>
          <RadixToast.Title className="flex-1 truncate text-xl font-bold">
            {title}
          </RadixToast.Title>
          <div className={`justify-self-end`}>
            <RadixToast.Close aria-label="Close" asChild>
              <span aria-hidden>
                <X />
              </span>
            </RadixToast.Close>
          </div>
        </div>
        <div className={`col-span-full row-start-2 mt-2  max-w-[300px]`}>
          <RadixToast.Description asChild>
            <p>{description}</p>
          </RadixToast.Description>
        </div>
      </RadixToast.Root>
    </React.Fragment>
  );
}
