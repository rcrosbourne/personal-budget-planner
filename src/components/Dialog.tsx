import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type DialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: React.ReactNode;
  title: React.ReactNode;
  closeButton: React.ReactNode;
  children: React.ReactNode;
};
export default function Dialog(
  { open, setOpen, trigger, title, closeButton, children }: DialogProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger className="relative" asChild>
          {trigger}
        </DialogPrimitive.Trigger>
        <AnimatePresence>
          {open ? (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-30" />
              <DialogPrimitive.Content
                asChild
                className={`absolute inset-0 rounded-md bg-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
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
                >
                  <div className="flex items-center justify-between bg-primary-400 p-4">
                    <div>
                      <DialogPrimitive.Title asChild>
                        {title}
                      </DialogPrimitive.Title>
                    </div>
                    <div>
                      <DialogPrimitive.Close
                        className="cursor-pointer p-2"
                        asChild
                      >
                        {closeButton}
                      </DialogPrimitive.Close>
                    </div>
                  </div>
                  <div
                    className="mt-10 p-4"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {children}
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          ) : null}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </>
  );
}
