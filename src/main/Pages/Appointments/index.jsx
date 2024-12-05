import React, { useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import "./style/index.css";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TbCalendarMonth, TbMenu2, TbX } from "react-icons/tb";

import { Separator } from "@/components/ui/separator";
import PickDate from "../components/PickDate";
import { AddNewAppointment } from "./components/AddNewAppointment";
import SearchBar from "../components/Search";
import { DoctorOrdate } from "./components/DoctorOrDate";
import { SelectClinic } from "../components/SelectClinic";
import AddAppointments from "./components/AddAppointments";
import DoctorsAppointments from "./components/DoctorsAppointments";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";

const Appointments = () => {
  const { role } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const date = new Date();

  return (
    <>
      <div className="w-full h-screen">
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"Appointments"} />
          {role !== "Owner" && role !== "Clinic Administrator" && (
            <AddAppointments trigger={"Add Appointments"} />
          )}
        </div>
        <div className="py-1 lg:py-3">
          <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="py-1 lg:py-4 w-full flex gap-3 flex-col lg:flex-row">
          <Input placeholder="Search..." className="" />

          <div className="flex items-center gap-2">
            <PickDate />
            {role !== "Doctor" && <DoctorsAppointments />}
          </div>
        </div>
        <div className="bg-white border border-gray-300 h-full flex lg:mx-32 rounded-lg shadow-lg mb-10"></div>
      </div>
    </>
  );
};

export default Appointments;
