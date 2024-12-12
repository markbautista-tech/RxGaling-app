import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentTitle from "../../PageContent/ContentTitle";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SearchBar from "../components/Search";
import { SelectClinic } from "../components/SelectClinic";
import { TbMenu2, TbX } from "react-icons/tb";

import PatientRegistration from "../Forms/PatientRegistration";
import PatientTable from "./components/PatientTable";
import { useUser } from "@/context/UserContext";

const PatientsManangement = () => {
  const { role } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const date = new Date();
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title={"Patients Management"} />
        <div className="relative flex ">
          <div className="flex items-center gap-2">
            <div className="">
              {role !== "Owner" && (
                <div className="flex gap-3">
                  <PatientRegistration />
                </div>
              )}
            </div>
            {/* <div className="relative">
              {showMenu ? (
                <TbX className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
              ) : (
                <TbMenu2 className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
              )}

              {showMenu && (
                <div className="bg-primary-foreground shadow-md p-3 rounded-b-md absolute top-10 right-0 flex flex-col gap-3">
                  <div>
                    <PatientRegistration />
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="w-full" />
      <div>
        <PatientTable />
      </div>
    </>
  );
};

export default PatientsManangement;
