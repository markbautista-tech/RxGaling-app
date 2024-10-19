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

const SuperAdmin = () => {
  const [showRequest, setShowRequest] = useState(false);

  // Function to toggle ClinicRequestCard on small screens
  const toggleRequest = () => setShowRequest(!showRequest);

  return (
    <>
      <div>
        <div>
          <PageHeader />
        </div>
        <div>
          <div>
            <div className="px-6 pt-4 lg:px-10 flex justify-between items-center">
              <div>
                <ContentTitle title={"Clinics"} />
              </div>
              <div className="flex">
                <div className="flex justify-end">
                  <div className="flex items-center">
                    <SearchBar />
                    <Profile />
                  </div>
                </div>
                {/* Show Clinic Request button only on small screens */}
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="lg:hidden flex justify-end">
              <Button
                onClick={toggleRequest}
                className="bg-primary text-white text-xs p-3"
              >
                Clinic Request
              </Button>
            </div>
          </div>
          <div className="flex justify-center gap-10 p-5">
            <div className="flex-1">
              <ClinicsTable />
            </div>

            {/* Show ClinicRequestCard on large screens, and toggle it on small screens */}
            <div
              className={`lg:block lg:min-w-[30%] ${showRequest ? "absolute transition-all z-50 top-36" : "hidden"}`}
            >
              <ClinicRequestCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdmin;
