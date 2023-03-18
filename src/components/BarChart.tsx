import { motion } from "framer-motion";
import React from "react";
import { ArrowDownLeft } from "react-feather";

export default function BarChart({ values }: { values: number[] }) {
  const [percentages, setPercentages] = React.useState<number[]>([]);
  React.useEffect(() => {
    const percentages = values.map((value) => {
      const max = Math.max(...values);
      // round to 1 decimal place
      return Math.round((value / max) * 1000) / 10;
    });
    setPercentages(percentages);
  }, [values]);
  return (
    <div className="flex">
      <div className="grid h-10 flex-1 grid-flow-col grid-cols-7">
        {percentages &&
          percentages.map((percentage, index) => (
            <motion.div
              key={index}
              className="w-2 self-end  rounded-t-sm bg-secondary-purple-500"
              style={{ height: `${percentage}%` }}
              initial={{ height: `0%` }}
              animate={{ height: `${percentage}%` }}
              transition={{
                duration: 0.4,
                delay: 0.2,
              }}
            />
          ))}
      </div>
      <div className="flex items-end justify-between gap-0.5">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-white">
          <ArrowDownLeft width={10} height={10} />
        </div>
        <div className="flex items-end">
          <span className="text-xs font-thin">28.0%</span>
        </div>
      </div>
    </div>
  );
}
