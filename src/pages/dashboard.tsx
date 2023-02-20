import React from "react";
import { signOut } from "next-auth/react";
import AuthLayout from "../components/AuthLayout";
import MobileMenu from "../components/MobileMenu";

import Head from "next/head";
import NewBudgetButton from "../components/NewBudgetButton";
import ViewBudgetHistoryButton from "../components/ViewBudgetHistoryButton";
import MainActionsWrapper from "../components/MainActionsWrapper";

export default function Dashboard() {
  return (
    <AuthLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="min-h-100">
        <header>
          <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 p-4">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-100">
                Personal Budget Planner
              </h2>
              <MobileMenu>
                <button
                  onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
                  className="block px-4 py-2 text-2xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 hover:underline"
                  role="menuitem"
                >
                  Sign Out
                </button>
              </MobileMenu>
            </div>
          </div>
        </header>
        <div className="mx-auto px-4">
          <MainActionsWrapper>
            <NewBudgetButton />
            <ViewBudgetHistoryButton />
          </MainActionsWrapper>

          <h3 className="mt-4 text-2xl font-bold text-neutral-900 ">
            March 2022
          </h3>
          {/*    Widget section */}
        </div>
      </div>
    </AuthLayout>
  );
}
