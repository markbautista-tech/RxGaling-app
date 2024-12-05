"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";

export function AdminDashboard({ items }) {
  const [activeLink, setActiveLink] = useState(null);

  const handleMenuClick = (link) => {
    setActiveLink(null);
    setActiveLink(link);
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`py-5 transition-all hover:bg-primary hover:text-white  ${activeLink === item.url ? "bg-primary text-white" : ""}`}
                    onClick={() => handleMenuClick(item.url)}
                  >
                    {item.icon && <item.icon className="lg:w-6 lg:h-6" />}
                    <span className="lg:text-[17px]">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
              <CollapsibleContent></CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
