import React from "react";

import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { api } from "../utils/api";
import { Budget } from "@prisma/client";

function showBudget(period: Date) {
  period.setMinutes(period.getMinutes() + period.getTimezoneOffset());
  return `${period.toLocaleString("default", {
    month: "long",
  })} ${period.getFullYear()}`;
}
export default function Dashboard() {
  // get all budgets
  const findBudgetQuery = api.budget.findAll.useQuery();
  const [budgets, setBudgets] = React.useState<Budget[]>([]);
  React.useEffect(() => {
    if (findBudgetQuery.data) {
      setBudgets(findBudgetQuery.data);
    }
  }, [findBudgetQuery.data]);
  return (
    <AppLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        {budgets.map((budget) => (
          <div key={budget.id}>
            <h3 className="mt-4 text-2xl font-bold text-neutral-900">
              {`${showBudget(budget.period)}`}
            </h3>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
