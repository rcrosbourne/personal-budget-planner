import { PlusCircle } from "react-feather";
export default function NewBudgetButton() {
  return (
    <button className="flex items-center justify-around rounded-md border border-transparent bg-primary-500 px-8 py-5 text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
      <PlusCircle size={40} />
      <span className="text-3xl">New</span>
    </button>
  );
}
