import React from "react";

export default function MainActionsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 grid w-full grid-cols-2 items-center justify-around gap-2">
      {children}
    </div>
  );
}
