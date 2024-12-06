import React, { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-pharmacy";
import PageHeader from "@/main/PageHeader";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import LoadingUI from "@/main/components/loadingUI";
import PharmacyContentRouter from "./ContentRouter/router";

const PharmacyApp = () => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [navigate, user, loading]);

  if (loading) return <LoadingUI />;
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <div>
            <PageHeader />
          </div>
          <div>
            <PharmacyContentRouter />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default PharmacyApp;
