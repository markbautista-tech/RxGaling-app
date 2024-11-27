import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import AddNewExistingStaff from "./components/AddNewExistingStaff";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import StaffTable from "./components/StaffTable";

const StaffManagement = () => {
  const { role } = useUser();
  return (
    <>
      <div>
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"Staff Management"} />
          <div className="relative flex ">
            <div className="flex items-center gap-2">
              {/* <SearchBar /> */}
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  {role === "clinic owner" ||
                  role === "Clinic Administrator" ? (
                    <AddNewExistingStaff />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <div>
          <StaffTable />
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
