import { type PropsWithChildren } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-auto  pt-24 ">
      <Header />
      {children}
      <div className="flex flex-col flex-auto items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
