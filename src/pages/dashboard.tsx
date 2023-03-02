import React from "react";

import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { api } from "../utils/api";
import { Budget } from "@prisma/client";
import { motion, PanInfo } from "framer-motion";

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
  const [left, setLeft] = React.useState(0);
  const [right, setRight] = React.useState(0);
  const [currentBudgetIndex, setCurrentBudgetIndex] = React.useState<
    number | undefined
  >(undefined);
  const [currentBudget, setCurrentBudget] = React.useState<Budget | undefined>(
    undefined
  );
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 0) {
      // select previous budget
      if (currentBudgetIndex !== undefined && currentBudgetIndex > 0) {
        // decrement budget
        setCurrentBudgetIndex(currentBudgetIndex - 1);
        setCurrentBudget(budgets[currentBudgetIndex - 1]);
        return;
      }
      setLeft(0);
    } else {
      if (
        currentBudgetIndex !== undefined &&
        currentBudgetIndex < budgets.length - 1
      ) {
        setCurrentBudgetIndex(currentBudgetIndex + 1);
        setCurrentBudget(budgets[currentBudgetIndex + 1]);
        return;
      }
      setRight(0);
    }
  };
  React.useEffect(() => {
    if (findBudgetQuery.data) {
      setBudgets(findBudgetQuery.data);
      setCurrentBudgetIndex(0);
      setCurrentBudget(findBudgetQuery.data[0]);
    }
  }, [findBudgetQuery.data]);
  return (
    <AppLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="h-full">
        {currentBudget && (
          <motion.div
            key={currentBudget.id}
            drag={"x"}
            onDragEnd={(event, info) => handleDragEnd(event, info)}
            dragConstraints={{ left, right }}
            className={"min-h-full w-full bg-neutral-100"}
          >
            <h3 className="mt-4 text-2xl font-bold text-neutral-900">
              {`${showBudget(currentBudget.period)}`}
            </h3>
          </motion.div>
        )}
        {/*{budgets.map((budget) => (*/}
        {/*  <div key={budget.id}>*/}
        {/*    <h3 className="mt-4 text-2xl font-bold text-neutral-900">*/}
        {/*      {`${showBudget(budget.period)}`}*/}
        {/*    </h3>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </AppLayout>
  );
}
