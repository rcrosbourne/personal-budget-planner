import React from "react";

import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h3 className="mt-4 text-2xl font-bold text-neutral-900">March 2022</h3>
    </AppLayout>
  );
}
