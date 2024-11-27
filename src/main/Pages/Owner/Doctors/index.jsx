import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import SearchBar from "../../components/Search";
import ContentTitle from "../../../PageContent/ContentTitle";
import CreateClinicDoctors from "./create";

import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import classNames from "classnames";
import AddDoctor from "@/main/Doctor/components/AddDoctor";
import AddNewExistingDoctor from "@/main/Doctor/components/AddNewExistingDoctor";
import DoctorAction from "@/main/Doctor/components/DoctorAction";

const ClinicDoctors = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Doc 1",
      specialization: "Internal Medicine",
      days: "MWF",
      hrs: "8am-5pm",
      isIn: false,
    },
    {
      id: 2,
      name: "Doc 2",
      specialization: "Internal Medicine",
      days: "MWF",
      hrs: "9am-6pm",
      isIn: false,
    },
    {
      id: 3,
      name: "Doc 3",
      specialization: "Internal Medicine",
      days: "MWF",
      hrs: "10am-7pm",
      isIn: false,
    },
    {
      id: 4,
      name: "Doc 4",
      specialization: "Internal Medicine",
      days: "MWF",
      hrs: "11am-8pm",
      isIn: false,
    },
    {
      id: 5,
      name: "Doc 5",
      specialization: "Internal Medicine",
      days: "MWF",
      hrs: "12pm-9pm",
      isIn: false,
    },
    {
      id: 6,
      name: "Doc 1",
      specialization: "Internal Medicine",
      days: "TTHS",
      hrs: "8am-5pm",
      isIn: false,
    },
    {
      id: 7,
      name: "Doc 7",
      specialization: "General Medicine",
      days: "TTHS",
      hrs: "9am-6pm",
      isIn: true,
    },
    {
      id: 8,
      name: "Doc 8",
      specialization: "General Medicine",
      days: "TTHS",
      hrs: "10am-7pm",
      isIn: false,
    },
    {
      id: 9,
      name: "Doc 9",
      specialization: "General Medicine",
      days: "TTHS",
      hrs: "11am-8pm",
      isIn: false,
    },
    {
      id: 10,
      name: "Doc 10",
      specialization: "General Medicine",
      days: "TTHS",
      hrs: "12pm-9pm",
      isIn: false,
    },
  ]);
  const handleToggleChange = (payload) => {
    const payloadIndex = users.findIndex((user) => user.id === payload.id);
    const usersCopy = [...users];
    const user = usersCopy[payloadIndex];
    user.isIn = !user.isIn;
    setUsers(usersCopy);
  };
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title={"Clinic Doctors"} />
        <div className="relative flex ">
          {/* <AddDoctor /> */}
          <AddNewExistingDoctor />
        </div>
      </div>
      <div className="py-4">
        <Separator orientation="horizontal" className="w-full " />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Search doctor's lastname..."
          className="mb-4 text-xs lg:text-sm"
        />
      </div>

      <Table className="text-xs lg:text-sm w-full ">
        <TableHeader>
          <TableRow>
            <TableHead className=""></TableHead>
            <TableHead className="w-[80px] lg:w-[200px] text-primary font-bold">
              Name
            </TableHead>
            <TableHead className="text-primary font-bold">
              Specialization
            </TableHead>
            <TableHead className="text-primary font-bold">Schedule</TableHead>
            <TableHead className="text-primary font-bold lg:w-[50px]">
              Action
            </TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="-z-40">
          {users.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-[20px]">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.specialization}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{item.days}</span>
                  <span>{item.hrs}</span>
                </div>
              </TableCell>
              <TableCell className="flex items-center">
                <Switch
                  id={`isIn-${item.name}`}
                  checked={item.isIn}
                  value={item.isIn}
                  onCheckedChange={() => handleToggleChange(item)}
                />
                <Label
                  htmlFor={`isIn-${item.name}`}
                  className={classNames(
                    `${item.isIn ? "text-green-500" : "text-red-500"} `
                  )}
                >
                  {item.isIn ? "Present" : "Absent"}
                </Label>
              </TableCell>
              <TableCell>
                <DoctorAction />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicDoctors;
