import { Layers } from "react-feather";
export default function ViewBudgetHistoryButton() {
  return (
    <button className="flex items-center justify-around gap-2 rounded-md border border-transparent bg-secondary-purple-500 px-8 py-4 text-white hover:bg-secondary-purple-800 focus:outline-none focus:ring-2 focus:ring-secondary-purple-500 focus:ring-offset-2">
      <Layers size={40} />
      <span className="text-2xl">History</span>
    </button>
  );
}
