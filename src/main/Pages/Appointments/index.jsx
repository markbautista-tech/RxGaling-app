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
import { PickDate } from "../components/PickDate";
import { AddNewAppointment } from "./components/AddNewAppointment";
import SearchBar from "../components/Search";
import { DoctorOrdate } from "./components/DoctorOrDate";
import { SelectClinic } from "../components/SelectClinic";
import AddAppointments from "./components/AddAppointments";

const data = [
  {
    time: "09:11 AM",
    name: "Jane Smith",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
  {
    time: "10:11 AM",
    name: "John Doe",
    doctor: "Dr. Bautista",
  },
];

const Appointments = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const date = new Date();

  return (
    <>
      <div className="w-full">
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"Appointments"} />
          <div className="relative flex ">
            <div className="flex items-center gap-2">
              <SearchBar />
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  {/* <DoctorOrdate trigger={"Add Appointments"} /> */}
                  <AddAppointments trigger={"Add Appointments"} />
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
                    {/* <DoctorOrdate trigger={"Add Appointments"} /> */}
                    <AddAppointments trigger={"Add Appointments"} />
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

        <div className="py-2">
          <div className="py-1 flex flex-col lg:py-2 gap-6 ">
            <div className="">
              <div className="">
                <PickDate />
              </div>
              {/* <SearchBar /> */}
            </div>
            <span className="text-xs italic text-muted-foreground lg:text-md">
              Appointments today {date.toDateString()} @ Acculife Medical
              Laboratory.
            </span>
          </div>

          <div className="rounded-lg border border-primary/30 shadow-md p-2">
            <div className="max-h-[450px] overflow-y-auto no-scrollbar">
              <Table className="text-xs lg:text-sm w-full ">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] lg:w-[200px] text-primary font-bold">
                      Time
                    </TableHead>
                    <TableHead className="text-primary font-bold">
                      Name
                    </TableHead>
                    <TableHead className="text-primary font-bold">
                      Doctor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="-z-40">
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.time}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
