import React from "react";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { ArrowLeft, ArrowRight, BarChart } from "react-feather";

const history = [
  {
    id: 1,
    period: "March 2023",
    income: "$300,000.00",
    expenses: "$190,000.00",
    savings: "$110,000.00",
  },
  {
    id: 2,
    period: "February 2023",
    income: "$300,000.00",
    expenses: "$190,000.00",
    savings: "$110,000.00",
  },
  {
    id: 3,
    period: "January 2023",
    income: "$300,000.00",
    expenses: "$190,000.00",
    savings: "$110,000.00",
  },
  {
    id: 4,
    period: "December 2022",
    income: "$300,000.00",
    expenses: "$190,000.00",
    savings: "$110,000.00",
  },
  {
    id: 5,
    period: "November 2022",
    income: "$300,000.00",
    expenses: "$190,000.00",
    savings: "$110,000.00",
  },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function History() {
  return (
    <AppLayout>
      <Head>
        <title>History</title>
      </Head>

      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-neutral-900">
              History
            </h1>
          </div>
        </div>
        <div className="-mx-4 mt-10 rounded shadow-xl ring-1 ring-neutral-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full">
            <caption className="border-b border-neutral-300">
              <div className="flex items-center">
                <BarChart size={40} />
                <h3 className="ml-2 text-2xl font-bold text-neutral-900">
                  History
                </h3>
              </div>
            </caption>
            <thead className={"border-b border-neutral-100"}>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-300 sm:pl-6"
                >
                  Period
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-neutral-300 lg:table-cell"
                >
                  Savings
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-300"
                >
                  Income
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-300"
                >
                  Expenses
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {history.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-l-4 border-secondary-purple-400"
                >
                  <td
                    className={classNames(
                      "relative py-4 pl-4 pr-3 text-sm sm:pl-6"
                    )}
                  >
                    <div className="text-md font-bold text-neutral-900">
                      {entry.period}
                    </div>
                  </td>
                  <td
                    className={
                      "hidden font-bold text-neutral-900 lg:table-cell"
                    }
                  >
                    <div className="">{entry.savings}</div>
                  </td>
                  <td>
                    <div className="text-sm font-bold text-neutral-900 lg:table-cell">
                      {entry.income}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-bold text-neutral-900 lg:table-cell">
                      {entry.expenses}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  className="py-3.5 pl-4 pr-8 text-left text-sm font-semibold text-neutral-900 sm:pl-6"
                >
                  <div className={"flex items-center justify-between"}>
                    <span>Showing 1 to 5 of 15</span>
                    <div className="flex items-center gap-4">
                      <button className="inline-flex items-center rounded-md rounded-md border border border-neutral-200 bg-white px-4 py-1 text-sm font-medium leading-4 shadow-sm hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                        <ArrowLeft
                          className={"hover:text-neutral-100- text-neutral-100"}
                        />
                        <span className={"sr-only"}>Previous</span>
                      </button>
                      <button className="inline-flex items-center rounded-md rounded-md border border border-neutral-200 bg-white px-4 py-1 text-sm font-medium leading-4 shadow-sm hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                        <ArrowRight
                          className={"hover:text-neutral-100- text-neutral-100"}
                        />
                        <span className={"sr-only"}>Next</span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
