import ContentTitle from "@/main/PageContent/ContentTitle";
import React from "react";
import { usePharmacyUser } from "@/context/UserPharmacyContext";
import { Separator } from "@/components/ui/separator";
import AddNewExistingStaff from "@/main/Pages/StaffManagement/components/AddNewExistingStaff";
import PharmacyStaffTable from "./PharmacyStaffTable";

const PharmacyStaffManagement = () => {
  const { pharmacyRole } = usePharmacyUser();
  return (
    <>
      <div>
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"Pharmacy Staffs"} />
          <div className="relative flex ">
            <div className="flex items-center gap-2">
              {/* <SearchBar /> */}
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  {pharmacyRole === "Owner" || pharmacyRole === "Clinic Administrator" ? (
                    <AddNewExistingStaff />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <div>
          <PharmacyStaffTable />
        </div>
      </div>
    </>
  );
};

export default PharmacyStaffManagement;
