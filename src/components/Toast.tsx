import React from "react";
import * as RadixToast from "@radix-ui/react-toast";

export default function Toast() {
  const [openToast, setOpenToast] = React.useState(false);
  return (
    <React.Fragment>
      <RadixToast.Root
        className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={openToast}
        onOpenChange={setOpenToast}
      >
        <RadixToast.Title className="text-slate12 mb-[5px] text-[15px] font-medium [grid-area:_title]">
          Scheduled: Catch up
        </RadixToast.Title>
        <RadixToast.Description asChild></RadixToast.Description>
        <RadixToast.Action
          className="[grid-area:_action]"
          asChild
          altText="Goto schedule to undo"
        ></RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
      ;
    </React.Fragment>
  );
}
