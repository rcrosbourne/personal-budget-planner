import React from "react";

import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { api } from "../utils/api";
import { Budget } from "@prisma/client";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { Plus } from "react-feather";
import BarChart from "../components/BarChart";

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
  const [initialX, setInitialX] = React.useState(0);
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
        setInitialX(info.offset.x * -1);
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
        setInitialX(info.offset.x * -1);
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
      <div className="relative h-full">
        <AnimatePresence>
          {currentBudget && (
            <motion.div
              key={currentBudget.id}
              drag={"x"}
              onDragEnd={(event, info) => handleDragEnd(event, info)}
              dragConstraints={{ left, right }}
              className={
                "absolute mt-4 min-h-full w-full rounded bg-neutral-50 px-4"
              }
              initial={{ x: initialX }}
              animate={{ x: 0 }}
              exit={{ x: initialX * -1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5,
                delay: 0.2,
              }}
            >
              <h3 className="mt-4 text-2xl font-bold text-neutral-900">
                {`${showBudget(currentBudget.period)}`}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-14">
                <div className="max-h-[96px] max-w-[171px] rounded-md bg-secondary-yellow-500 px-4 py-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-1 flex-col">
                      <span className="text-xs font-thin">Expenses</span>
                      <span className="text-sm font-bold">$2,500,650.34</span>
                    </div>
                    <div>
                      <button className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-50">
                        <Plus width={10} height={10} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-0.5">
                    <BarChart values={[100, 400, 700, 300, 150, 30, 80]} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
