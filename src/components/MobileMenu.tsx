import React from "react";
import { Menu, X } from "react-feather";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="relative" asChild>
        <button className="p-2">
          <Menu className="text-neutral-100" />
          <span className="sr-only">Show menu</span>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-30" />
            <Dialog.Content
              asChild
              className={`absolute top-0 right-0 mt-0 min-h-full w-3/4 w-56 origin-top-right rounded-md bg-neutral-100 p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
                <div
                  className="mt-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {children}
                </div>
                <Dialog.Close
                  className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer p-2  "
                  asChild
                >
                  <button>
                    <X className="text-neutral-900" />
                    <span className="sr-only">Close menu</span>
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
