import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShowerHead } from "lucide-react";
import ClinicActions from "./ClinicActions";

const ClinicsTable = () => {
  return (
    <>
      <Table className="min-w-[90%]">
        <TableHeader>
          <TableRow>
            {/* Always visible headers */}
            <TableHead className="text-left">Profile</TableHead>
            <TableHead className=" lg:table-cell">Clinic Name</TableHead>
            <TableHead className=" lg:table-cell">Owner Name</TableHead>
            <TableHead className="hidden lg:table-cell">
              Clinic Address
            </TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>

            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {/* Visible in all views */}
            <TableCell>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="lg:table-cell max-w-[90px] lg:max-w-full truncate overflow-hidden">
              Acculife Medical Laboratory
            </TableCell>
            <TableCell className="lg:table-cell max-w-[90px] lg:max-w-full truncate overflow-hidden">
              Dr. Ray Mark Bautista
            </TableCell>
            <TableCell className="hidden lg:table-cell max-w-[90px] lg:max-w-full truncate overflow-hidden">
              Aringay, La Union
            </TableCell>
            <TableCell className="hidden lg:table-cell max-w-[90px] lg:max-w-full truncate overflow-hidden">
              Verified
            </TableCell>
            <TableCell>
              <ClinicActions />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicsTable;
