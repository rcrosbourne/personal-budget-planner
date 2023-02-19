import React from "react";
import { signOut, useSession } from "next-auth/react";
import AuthLayout from "../components/AuthLayout";
export default function Dashboard() {
  return (
    <AuthLayout>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </AuthLayout>
  );
}
