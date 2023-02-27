import React from "react";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";

export default function History() {
  return (
    <AppLayout>
      <Head>
        <title>History</title>
      </Head>
      <h3 className="mt-4 text-2xl font-bold text-neutral-900">History</h3>
    </AppLayout>
  );
}
