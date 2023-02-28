import React from "react";
import AuthLayout from "./AuthLayout";
import MobileMenu from "../MobileMenu";
import { getCsrfToken, signOut } from "next-auth/react";
import MainActionsWrapper from "../MainActionsWrapper";
import NewBudgetButton from "../NewBudgetButton";
import ViewBudgetHistoryButton from "../ViewBudgetHistoryButton";
import { CtxOrReq } from "next-auth/client/_utils";
import Link from "next/link";

export default function AppLayout({
  csrfToken,
  children,
}: {
  csrfToken?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <div className="min-h-full">
        <header>
          <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 p-4">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
              <Link href={"/dashboard"}>
                <h2 className="font-cursive text-2xl font-bold text-neutral-100 hover:underline">
                  Personal Budget Planner
                </h2>
              </Link>
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
        <div className="mx-auto min-h-full px-4">
          <MainActionsWrapper>
            <NewBudgetButton csrfToken={csrfToken} />
            <ViewBudgetHistoryButton />
          </MainActionsWrapper>
          <div className="min-h-full">{children}</div>
        </div>
      </div>
    </AuthLayout>
  );
}
export async function getServerSideProps(context: CtxOrReq) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
