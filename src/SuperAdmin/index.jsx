import React, { useEffect, useState } from "react";
import PageHeader from "../main/PageHeader";
import ContentTitle from "../main/PageContent/ContentTitle";
import ClinicRequestCard from "./components/RequestCard";

import { Button } from "@/components/ui/button";
import ClinicsTable from "./components/ClinicsTable";
import SearchBar from "../main/Pages/components/Search";
import Profile from "./components/Profile";
import getClinicRequest from "../utils/data/fetch/getClinicRequest";
import getClinicDetails from "../utils/data/fetch/getClinicDetails";
import { fetchAuth } from "@/utils/data/login";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AdminRouterContent from "./adminRouterContent";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const { user, loading, setUser } = useUser();
  const [showRequest, setShowRequest] = useState(false);

  const toggleRequest = () => setShowRequest(true);

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

        <div className="w-full">
          <div>
            <PageHeader />
          </div>
          <div>
            <AdminRouterContent />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default SuperAdmin;
