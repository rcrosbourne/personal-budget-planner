import React from "react";

type MainWrapperProps = {
  children: React.ReactNode;
};

const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <div className="flex min-h-full flex-col justify-center bg-conic-gradient from-neutral-900 via-primary-400 to-secondary-blue-100 py-12 sm:px-6 lg:px-8 ">
      {children}
    </div>
  );
};
export default MainWrapper;
