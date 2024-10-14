import React, { useState } from "react";
import MenuOption from "/src/main/Sidebar/Menu/MenuOption";

import { LuLayoutDashboard } from "react-icons/lu";
import
  {
    TbCalendarClock,
    TbSettings,
    TbUserCircle,
    TbUserCog,
    TbChevronRight,
    TbChevronLeft,
  } from "react-icons/tb";
import { RiUserHeartLine } from "react-icons/ri";
import { BiClinic } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";

import "./style/index.css";

const menuOption = [
  {
    icon: <LuLayoutDashboard className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Dashboard",
    link: "/clinic-app/dashboard",
  },
  {
    icon: <TbCalendarClock className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Appointments",
    link: "/clinic-app/appointments",
  },
  {
    icon: <RiUserHeartLine className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Patients",
    link: "/clinic-app/patients",
  },
  {
    icon: <TbSettings className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Management",

    submenu: [
      {
        icon: <TbUserCog className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: "Users",
        link: "/clinic-app/user-management",
      },
      {
        icon: <BiClinic className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: "Clinic",
        link: "/clinic-app/clinic",
      },
      {
        icon: <BiClinic className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: "Clinic Staff",
        link: "/clinic-app/clinic-staff",
      },
      {
        icon: <BiClinic className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: "Clinic Doctors",
        link: "/clinic-app/clinic-doctors",
      },

      {
        icon: <GiMedicines className="w-5 h-5 lg:w-6 lg:h-6" />,
        title: "Pharmacy",
        link: "/clinic-app/clinic-pharmacy",
      },
    ],
  },
  {
    icon: <TbUserCircle className="w-5 h-5 lg:w-6 lg:h-6" />,
    title: "Profile",
    link: "/clinic-app/profile-management",
  },
];

const Menu = () =>
{
  const [ activeMenu, setActiveMenu ] = useState(null);
  const [ activeLink, setActiveLink ] = useState(null);

  const toggleSubmenu = (menuTitle) =>
  {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle);
  };

  const handleSubmenuClick = (link) =>
  {
    setActiveLink(link);
    setActiveMenu(null);
  };

  const handleMenuClick = (link) =>
  {
    setActiveLink(link);
    setActiveMenu(null);
  };

  return (
    <div className="flex lg:flex-col gap-5 lg:gap-3 justify-center lg:justify-start">
      {menuOption.map((menu, ids) => (
        <div key={ids}>
          <div
            onClick={() => menu.submenu && toggleSubmenu(menu.title)}
            className={`relative flex items-center justify-between cursor-pointer w-full hover:bg-primary hover:text-white rounded-md transition-all ${activeLink === menu.link ? "bg-primary text-white" : ""
              }`}
          >
            <MenuOption
              link={menu.link}
              icon={menu.icon}
              title={menu.title}
              onClick={() => handleMenuClick(menu.link)}
            />

            {menu.submenu && (
              <span>
                {activeMenu === menu.title ? (
                  <TbChevronLeft className="hidden lg:block w-5 h-5" />
                ) : (
                  <TbChevronRight className="hidden lg:block w-5 h-5" />
                )}
              </span>
            )}
          </div>

          {menu.submenu && activeMenu === menu.title && (
            <div className="absolute bottom-0 lg:left-[250px] lg:bottom-[200] w-fit bg-primary/50 rounded-md backdrop-blur-md">
              {menu.submenu.map((submenu, subId) => (
                <MenuOption
                  key={subId}
                  link={submenu.link}
                  icon={submenu.icon}
                  title={submenu.title}
                  onClick={() => handleSubmenuClick(menu.link)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
