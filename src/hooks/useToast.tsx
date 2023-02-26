import React from "react";
import { ToastContext } from "../components/ToastProvider";

function useToast() {
  return React.useContext(ToastContext);
}

export default useToast;
