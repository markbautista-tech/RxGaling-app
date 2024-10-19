import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Logout from "./Logout";
import { logout } from "../auth/login";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col lg:w-[250px] bg-sidebar_bg lg:p-2 fixed left-0 w-full bottom-0 h-14 lg:h-screen z-50">
        <div className="p-5 mb-10 hidden lg:block">
          <Logo />
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-1 w-full">
            <Menu />
          </div>
          <div onClick={logout()}>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
