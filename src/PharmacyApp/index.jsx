import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import PageHeader from "@/main/PageHeader";

const PharmacyApp = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <PageHeader />
        </div>
      </SidebarProvider>
    </>
  );
};

export default PharmacyApp;
