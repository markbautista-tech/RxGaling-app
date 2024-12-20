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

const NavPharmacy = () => {
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
              <Link to="/pharmacy-app/dashboard">
                <SidebarMenuButton
                  className={`py-5 hover:bg-primary hover:text-white rounded-md ${activeLink === "/pharmacy-app/dashboard" ? "bg-primary text-white" : ""}`}
                  onClick={() => handleMenuClick("/pharmacy-app/dashboard")}
                >
                  <RiDashboardHorizontalLine />
                  <span className="lg:text-[16px]">Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to="/pharmacy-app/dispenser">
                <SidebarMenuButton
                  className={`py-5 hover:bg-primary hover:text-white rounded-md ${activeLink === "/pharmacy-app/dispenser" ? "bg-primary text-white" : ""}`}
                  onClick={() => handleMenuClick("/pharmacy-app/dispenser")}
                >
                  <GiMedicines />
                  <span className="lg:text-[16px]">Medicine Dispenser</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

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
                      <Link to="/pharmacy-app/pharmacy-staff">
                        <SidebarMenuSubButton
                          asChild
                          className={`py-3 hover:bg-primary hover:text-white rounded-sm  ${activeLink === "/pharmacy-app/pharmacy-staff" ? "bg-primary text-white" : ""}`}
                          onClick={() =>
                            handleMenuClick("/pharmacy-app/pharmacy-staff")
                          }
                        >
                          <span className="lg:text-[14px]">Manage Staffs</span>
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link to="/pharmacy-app/medicine-inventory">
                        <SidebarMenuSubButton
                          asChild
                          className={`py-3 hover:bg-primary hover:text-white rounded-sm  ${activeLink === "/pharmacy-app/medicine-inventory" ? "bg-primary text-white" : ""}`}
                          onClick={() =>
                            handleMenuClick("/pharmacy-app/medicine-inventory")
                          }
                        >
                          <span className="lg:text-[14px]">
                            Medicine Inventory
                          </span>
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavPharmacy;
