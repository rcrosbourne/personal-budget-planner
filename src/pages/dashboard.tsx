import React from "react";
import { signOut } from "next-auth/react";
import AuthLayout from "../components/AuthLayout";
import MobileMenu from "../components/MobileMenu";

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
              <MobileMenu authenticated={true} />
            </div>
          </div>
        </header>
      </div>
      <h1>Dashboard</h1>;
      <button onClick={() => signOut({ redirect: false, callbackUrl: "/" })}>
        Sign out
      </button>
      ;
    </AuthLayout>
  );
}
