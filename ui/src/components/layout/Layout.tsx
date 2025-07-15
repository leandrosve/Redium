import { type PropsWithChildren } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-auto">
      <Header />
      {children}
      <Outlet />
    </div>
  );
};

export default Layout;
