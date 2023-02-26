import React from "react";
import { ToastProps, ToastWrapper } from "./Toast";
import * as RadixToast from "@radix-ui/react-toast";

export const ToastContext = React.createContext({
  showToast: (content: ToastProps) => {},
});
let id = 1;
export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);
  const showToast = React.useCallback(
    (content: ToastProps) => {
      setToasts((toasts) => {
        return [...toasts, { ...content }];
      });
    },
    [setToasts]
  );

  return (
    <RadixToast.Provider swipeDirection="right">
      <ToastContext.Provider value={{ showToast }}>
        {children}
        <ToastWrapper toasts={toasts} />
      </ToastContext.Provider>
      <RadixToast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </RadixToast.Provider>
  );
}
