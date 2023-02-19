import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Menu } from "react-feather";
import AppScreenshot from "../components/AppScreenshot";
import GuestLayout from "../components/GuestLayout";

const Home: NextPage = () => {
  return (
    <GuestLayout>
      <Head>
        <title>Budget Landing Page</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`min-h-full bg-neutral-100`}>
        <header>
          <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 p-4">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-100">
                Personal Budget Planner
              </h2>
              <button>
                <Menu className="text-neutral-100" />
                <span className="sr-only">Show menu</span>
              </button>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center gap-2 p-4">
          <h2 className="max-w-lg text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
            A better way to manage and plan your budget
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Take control of your finances and start planning your budget today.
            Our user-friendly interface makes it easy to manage your budget and
            track your spending on a monthly basis.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-primary-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Register Today
            </Link>

            <Link
              href="/auth/signin"
              className="rounded-md border border-primary-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-neutral-900 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Sign In
            </Link>
          </div>
          <AppScreenshot />
        </div>
      </div>
    </GuestLayout>
  );
};

export default Home;
