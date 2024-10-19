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
import CreateClinicStaff from "./create";



const ClinicStaff = () =>
{
  const [ clinicModal, setClinicModal ] = useState(false)
  return (
    <>
      <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
        <ContentTitle title={"Clinic Staff"} />
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
                <CreateClinicStaff />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table className="text-xs lg:text-sm w-full ">
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary font-bold" />
            <TableHead className="w-[80px] lg:w-[200px] text-primary font-bold">
              Name
            </TableHead>
            <TableHead className="text-primary font-bold">
              Role
            </TableHead>
            <TableHead className="text-primary font-bold">
              Address
            </TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody className="-z-40">
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.time}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.doctor}</TableCell>
                </TableRow>
              ))}
            </TableBody> */}
      </Table>
    </>
  )
}

export default ClinicStaff;