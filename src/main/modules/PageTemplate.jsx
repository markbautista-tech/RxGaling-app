import React from "react";
import Sidebar from "../Sidebar";
import PageHeader from "../PageHeader";
import ContentRouter from "../ContentRouter/router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const PageTemplate = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <div className="lg:flex w-screen h-screen no-scrollbar">
          {/* <Sidebar /> */}
          <div className="w-full">
            <div className="fixed w-full">
              <PageHeader />
            </div>
            <div className="lg:pt-12 lg:px-10 h-full pt-10 px-5 mb-10 no-scrollbar">
              <ContentRouter />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default PageTemplate;
