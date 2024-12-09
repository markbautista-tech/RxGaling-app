import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TbCalendarClock, TbSettings } from "react-icons/tb";
import { RiUserHeartLine } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const NavAllData = () => {
  const { role } = useUser();
  const [activeLink, setActiveLink] = useState(null);

  const handleMenuClick = (link) => {
    setActiveLink(null);
    setActiveLink(link);
  };
  return (
    <>
      <SidebarGroup className="pt-6 px-3">
        <SidebarGroupLabel className="text-sm"></SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <Link to="/clinic-app/dashboard">
                <SidebarMenuButton
                  className={`py-5 hover:bg-primary hover:text-white rounded-md ${activeLink === "/clinic-app/dashboard" ? "bg-primary text-white" : ""}`}
                  onClick={() => handleMenuClick("/clinic-app/dashboard")}
                >
                  <RiDashboardHorizontalLine />
                  <span className="lg:text-[16px]">Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to="/clinic-app/appointments">
                <SidebarMenuButton
                  className={`py-5 hover:bg-primary hover:text-white rounded-md ${activeLink === "/clinic-app/appointments" ? "bg-primary text-white" : ""}`}
                  onClick={() => handleMenuClick("/clinic-app/appointments")}
                >
                  <TbCalendarClock />
                  <span className="lg:text-[16px]">Appointments</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to="/clinic-app/patients">
                <SidebarMenuButton
                  className={`py-5 hover:bg-primary hover:text-white rounded-md ${activeLink === "/clinic-app/patients" ? "bg-primary text-white" : ""}`}
                  onClick={() => handleMenuClick("/clinic-app/patients")}
                >
                  <RiUserHeartLine />
                  <span className="lg:text-[16px]">Patients</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {role !== "Doctor" && (
              <Collapsible
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <TbSettings />
                      <span className="lg:text-[16px]">Management</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Link to="/clinic-app/doctor-management">
                          <SidebarMenuSubButton
                            asChild
                            className={`py-3 hover:bg-primary hover:text-white rounded-sm ${activeLink === "/clinic-app/doctor-management" ? "bg-primary text-white" : ""}`}
                            onClick={() =>
                              handleMenuClick("/clinic-app/doctor-management")
                            }
                          >
                            <span className="lg:text-[14px]">
                              Manage Doctors
                            </span>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link to="/clinic-app/staff-management">
                          <SidebarMenuSubButton
                            asChild
                            className={`py-3 hover:bg-primary hover:text-white rounded-sm  ${activeLink === "/clinic-app/staff-management" ? "bg-primary text-white" : ""}`}
                            onClick={() =>
                              handleMenuClick("/clinic-app/staff-management")
                            }
                          >
                            <span className="lg:text-[14px]">
                              Manage Staffs
                            </span>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                      {role === "Owner" && (
                        <SidebarMenuSubItem>
                          <Link to="/clinic-app/pharmacy-management">
                            <SidebarMenuSubButton
                              asChild
                              className={`py-3 hover:bg-primary hover:text-white rounded-sm  ${activeLink === "/clinic-app/pharmacy-management" ? "bg-primary text-white" : ""}`}
                              onClick={() =>
                                handleMenuClick(
                                  "/clinic-app/pharmacy-management"
                                )
                              }
                            >
                              <span className="lg:text-[14px]">Pharmacy</span>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavAllData;
