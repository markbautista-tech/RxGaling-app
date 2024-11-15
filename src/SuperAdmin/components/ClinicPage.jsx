import ContentTitle from "@/main/PageContent/ContentTitle";
import SearchBar from "@/main/Pages/components/Search";
import React from "react";
import ClinicRequestCard from "./RequestCard";
import ClinicsTable from "./ClinicsTable";

const ClinicPage = () => {
  return (
    <>
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
                  {/* <Profile /> */}
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
    </>
  );
};

export default ClinicPage;
