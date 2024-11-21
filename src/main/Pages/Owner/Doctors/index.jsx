import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import
{
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

import { Switch } from "@/components/ui/switch"
import classNames from "classnames";


const ClinicDoctors = () =>
{
  const [ users, setUsers ] = useState([
    {
      id: 1,
      name: "Doc 1",
      days: "MWF",
      hrs: "8am-5pm",
      isIn: false
    },
    {
      id: 2,
      name: "Doc 2",
      days: "MWF",
      hrs: "9am-6pm",
      isIn: false
    },
    {
      id: 3,
      name: "Doc 3",
      days: "MWF",
      hrs: "10am-7pm",
      isIn: false
    },
    {
      id: 4,
      name: "MWF",
      days: "MWF",
      hrs: "11am-8pm",
      isIn: false
    }, {
      id: 5,
      name: "Doc 5",
      days: "MWF",
      hrs: "12pm-9pm",
      isIn: false
    },
    {
      id: 6,
      name: "Doc 1",
      days: "TTHS",
      hrs: "8am-5pm",
      isIn: false
    },
    {
      id: 7,
      name: "Doc 7",
      days: "TTHS",
      hrs: "9am-6pm",
      isIn: true
    },
    {
      id: 8,
      name: "Doc 8",
      days: "TTHS",
      hrs: "10am-7pm",
      isIn: false
    },
    {
      id: 9,
      name: "Doc 9",
      days: "TTHS",
      hrs: "11am-8pm",
      isIn: false
    }, {
      id: 10,
      name: "Doc 10",
      days: "TTHS",
      hrs: "12pm-9pm",
      isIn: false
    },
  ]);
  const handleToggleChange = (payload)=>{
    const payloadIndex = users.findIndex(user=> user.id === payload.id)
    const usersCopy = [...users]
    const user = usersCopy[payloadIndex];
    user.isIn = !user.isIn
    setUsers(usersCopy)
  }
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title={"Clinic Doctors"} />
        <div className="relative flex ">
          <div className="flex items-center gap-2">
            <SearchBar />
            <div className="hidden lg:block">
              <div className="flex gap-3">
                {/* <PatientRegistration />
                <SelectClinic /> */}
                {/* <Button>
                  Add Clinic Staff
                </Button> */}
                {/* <CreateClinicDoctors /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table className="text-xs lg:text-sm w-full ">
        <TableHeader>
          <TableRow>
            {/* <TableHead className="text-primary font-bold" /> */}
            <TableHead className="w-[80px] lg:w-[200px] text-primary font-bold">
              Name
            </TableHead>
            <TableHead className="text-primary font-bold">
              Days
            </TableHead>
            <TableHead className="text-primary font-bold">
              Hours
            </TableHead>
            <TableHead className="text-primary font-bold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="-z-40">
          {users.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.days}</TableCell>
              <TableCell>{item.hrs}</TableCell>
              <TableCell className="flex items-center">
                <Switch id={`isIn-${item.name}`} checked={item.isIn} value={item.isIn} onCheckedChange={()=>handleToggleChange(item)} />
                <Label htmlFor={`isIn-${item.name}`} className={classNames(
                  `${item.isIn ? 'text-green-500' : 'text-red-500'} `
                )}>
                  {item.isIn ? "Present" : "Absent"}
                </Label>
              </TableCell>
              {/* <TableCell className="space-x-2">
                <Button size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </Button>
                <Button size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                  </svg>

                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ClinicDoctors;