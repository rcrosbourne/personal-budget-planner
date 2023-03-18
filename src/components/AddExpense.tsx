import React from "react";
import BarChart from "./BarChart";
import { Plus, X } from "react-feather";
import { Budget } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function AddExpense({ budget }: { budget: Budget }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="max-h-[96px] max-w-[171px] rounded-md bg-secondary-yellow-500 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-thin">Expenses</span>
            <span className="text-sm font-bold">$2,500,650.34</span>
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
          <BarChart values={[100, 400, 700, 300, 150, 30, 80]} />
        </div>
      </div>
      <Content open={open} />
    </Dialog.Root>
  );
}
const Content = ({ open }: { open: boolean }) => {
  return (
    <AnimatePresence>
      {open ? (
        <Dialog.Portal forceMount>
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-30" />
          <Dialog.Content
            asChild
            className={`absolute inset-0 rounded-md bg-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:top-1/4 md:mx-auto md:my-0 md:h-1/2 md:max-w-5xl`}
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
                <h2>testing</h2>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </AnimatePresence>
  );
};
