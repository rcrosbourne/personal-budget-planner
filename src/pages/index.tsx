import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import React from "react";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "folks" });

  return (
    <>
      <Head>
        <title>Budget Landing Page</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`min-h-full bg-neutral-100`}>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">Initalizing Budget App</p>
          <AuthShowcase />
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      {!sessionData && (
        <Link
          href="/register"
          className={`rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20`}
        >
          register
        </Link>
      )}
    </div>
  );
};
