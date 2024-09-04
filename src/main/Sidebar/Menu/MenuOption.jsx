import React from "react";
import { Link } from "react-router-dom";

const MenuOption = ({ icon, title, link, isActive, onClick }) => {
  return (
    <Link to={link}>
      <div
        className={`font-medium flex items-center justify-start p-4 gap-x-3 w-full hover:bg-primary/30 hover:text-white rounded-md transition-all ${isActive && "active"} `}
        onClick={onClick}
      >
        <div className="">{icon}</div>
        <span className="hidden lg:block">{title}</span>
      </div>
    </Link>
  );
};

export default MenuOption;
