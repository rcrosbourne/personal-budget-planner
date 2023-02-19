import React from "react";
import { signOut } from "next-auth/react";
import AuthLayout from "../components/AuthLayout";
export default function Dashboard() {
  return (
    <AuthLayout>
      <h1>Dashboard</h1>
      <button onClick={() => signOut({ redirect: false, callbackUrl: "/" })}>
        Sign out
      </button>
    </AuthLayout>
  );
}
