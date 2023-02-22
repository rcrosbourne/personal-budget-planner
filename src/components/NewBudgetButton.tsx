import React from "react";
import { PlusCircle } from "react-feather";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";
export default function NewBudgetButton() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="relative" asChild>
        <button className="flex items-center justify-around rounded-md border border-transparent bg-primary-500 px-8 py-5 text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <PlusCircle size={30} />
          <span className="text-2xl">New</span>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-30" />
            <Dialog.Content
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
                    <Dialog.Title asChild>
                      <p className="">Create a new Budget</p>
                    </Dialog.Title>
                  </div>
                  <div>
                    <Dialog.Close className="cursor-pointer p-2" asChild>
                      <button>
                        <X className="text-neutral-900" />
                        <span className="sr-only">Close menu</span>
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
                <div
                  className="mt-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                ></div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
function NewBudgetDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex items-center justify-around rounded-md border border-transparent bg-primary-500 px-8 py-5 text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        <PlusCircle size={30} />
        <span className="text-2xl">New</span>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      <Dialog.Content className="fixed inset-0 flex items-center justify-center">
        <Dialog.Close className="absolute top-0 right-0 m-4">
          <button className="flex items-center justify-around rounded-md border border-transparent bg-primary-500 px-8 py-5 text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <PlusCircle size={30} />
            <span className="text-2xl">New</span>
          </button>
        </Dialog.Close>
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <Dialog.Title className="text-2xl font-bold">New Budget</Dialog.Title>
          <Dialog.Description className="mt-4">
            Create a new budget
          </Dialog.Description>
          <div className="mt-4">
            <Dialog.Close asChild>
              <button className="flex items-center justify-around rounded-md border border-transparent bg-primary-500 px-8 py-5 text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <PlusCircle size={30} />
                <span className="text-2xl">New</span>
              </button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
