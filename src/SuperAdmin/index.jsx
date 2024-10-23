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
import useClinicDetails from "./hooks/useClinicDetails";

const SuperAdmin = () => {
  const [showRequest, setShowRequest] = useState(false);

  const toggleRequest = () => setShowRequest(true);

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
            <div className="flex justify-end lg:mr-5">
              {/* <Button
                onClick={toggleRequest}
                className="bg-primary text-white text-xs lg:text-[16px] p-5 shadow-md"
              >
                Clinic Request
                <span className="ml-3 p-1 bg-white text-black rounded-sm">
                  {countRequest()}
                </span>
              </Button> */}
              <ClinicRequestCard />
            </div>
          </div>
          <div className="flex justify-center gap-10 p-5">
            <div className="flex-1">
              <ClinicsTable />
            </div>

            {/* Show ClinicRequestCard on large screens, and toggle it on small screens */}
            {/* {showRequest && (
              <div>
                <ClinicRequestCard />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdmin;
