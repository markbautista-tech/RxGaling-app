import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import PageHeader from "../PageHeader";
import ContentRouter from "../ContentRouter/router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const PageTemplate = () => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/user-login");
    }
  }, [navigate, user, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <div className="lg:flex w-screen h-screen no-scrollbar">
          {/* <Sidebar /> */}
          <div className="w-full">
            <div className="fixed w-full z-50">
              <PageHeader />
            </div>
            <div className=" lg:px-10 h-full pt-14 px-5 mb-10 no-scrollbar">
              <ContentRouter />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default PageTemplate;
