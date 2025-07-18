import { type PropsWithChildren } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/pages/ErrorBoundary";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-auto ">
      <div className="h-screen w-screen -z-1 fixed t-0 r-0 background-effect opacity-15 dark:opacity-50" />
      <Header />
      {children}
      <div className="flex flex-col flex-auto items-center mt-24 max-md:px-4">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Layout;
