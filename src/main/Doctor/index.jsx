import React, { useState } from "react";
import ContentTitle from "../PageContent/ContentTitle";
import { TbMenu2, TbX } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import AddDoctor from "./components/AddDoctor";

const DoctorPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div>
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"Doctor Management"} />
          <div className="relative flex ">
            <div className="flex items-center gap-2">
              <div className="">
                <div className="flex gap-3">
                  <AddDoctor />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <div></div>
      </div>
    </>
  );
};

export default DoctorPage;
