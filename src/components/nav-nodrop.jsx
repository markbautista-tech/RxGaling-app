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
import useActiveLink from "./hooks/useActiveLink";

export function NavNoDrop({ items }) {
  const { activeLink, handleMenuClick } = useActiveLink();

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
                {/* <a href={item.url}> */}
                <Link to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`py-5 hover:bg-primary hover:text-white ${activeLink === item.url ? "bg-primary text-white" : ""}`}
                    onClick={() => handleMenuClick(item.url)}
                  >
                    {item.icon && <item.icon className="lg:w-6 lg:h-6" />}
                    <span className="lg:text-[17px]">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
                {/* </a> */}
              </CollapsibleTrigger>
              <CollapsibleContent></CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
