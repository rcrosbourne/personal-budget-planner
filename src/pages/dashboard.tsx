import React from "react";
import { signOut } from "next-auth/react";
import AuthLayout from "../components/AuthLayout";
import { Menu, X } from "react-feather";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
export default function Dashboard() {
  return (
    <AuthLayout>
      <div className="min-h-100">
        <header>
          <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 p-4">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-100">
                Personal Budget Planner
              </h2>
              <Dialog.Root>
                <Dialog.Trigger className="relative" asChild>
                  <button className="p-2">
                    <Menu className="text-neutral-100" />
                    <span className="sr-only">Show menu</span>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-30" />
                  <Dialog.Content className="absolute top-0 right-0 mt-0 min-h-full w-3/4 w-56 origin-top-right rounded-md bg-neutral-100 p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                      className="mt-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={() =>
                          signOut({ redirect: false, callbackUrl: "/" })
                        }
                        className="block px-4 py-2 text-2xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 hover:underline"
                        role="menuitem"
                      >
                        Sign Out
                      </button>
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
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </header>
        kk
      </div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut({ redirect: false, callbackUrl: "/" })}>
        Sign out
      </button>
    </AuthLayout>
  );
}
