import React, { useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import { Separator } from "@/components/ui/separator";
import SearchBar from "../components/Search";
import { SelectClinic } from "../components/SelectClinic";
import { TbMenu2, TbX } from "react-icons/tb";

const PatientsManangement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const date = new Date();
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center">
        <ContentTitle title={"Patients"} />
        <div className="relative flex ">
          <div className="flex items-center gap-2">
            <SearchBar />
            <div className="hidden lg:block">
              <div className="flex gap-3">
                <SelectClinic />
              </div>
            </div>
            <div className="relative">
              {showMenu ? (
                <TbX className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
              ) : (
                <TbMenu2 className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
              )}

              {showMenu && (
                <div className="bg-primary-foreground shadow-md p-3 rounded-b-md absolute top-10 right-0 flex flex-col gap-3">
                  <div className="w-full">
                    <SelectClinic />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="w-full" />
    </>
  );
};

export default PatientsManangement;
