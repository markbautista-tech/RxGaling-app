import React from "react";

import { TbLogout2 } from "react-icons/tb";

const Logout = () => {
  return (
    <div className="font-medium flex items-center justify-start p-3 gap-x-3 hover:bg-primary hover:text-white rounded-md transition-all">
      <TbLogout2 className="w-6 h-6" />
      <span>Logout</span>
    </div>
  );
};

export default Logout;
