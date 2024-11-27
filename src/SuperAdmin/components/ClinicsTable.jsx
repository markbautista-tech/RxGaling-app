import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShowerHead } from "lucide-react";
import ClinicActions from "./ClinicActions";
import { Input } from "@/components/ui/input";

const ClinicsTable = () => {
  return (
    <>
      <div className="">
        <Input
          type="text"
          placeholder="Search clinic..."
          className="mb-4 text-xs lg:text-sm"
        />
      </div>
      <Table className="min-w-[90%]">
        <TableHeader>
          <TableRow>
            {/* Always visible headers */}
            <TableHead className="text-left w-[20px]"></TableHead>
            <TableHead className=" lg:table-cell">Clinic Name</TableHead>
            <TableHead className="hidden lg:table-cell">Owner Name</TableHead>
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
            <TableCell className="hidden lg:table-cell max-w-[90px] lg:max-w-full truncate overflow-hidden">
              Dr. Ray Mark Bautista
            </TableCell>
            <TableCell className="hidden lg:table-cell max-w-[90px] lg:max-w-full truncate overflow-hidden">
              <Badge
                variant=""
                className="bg-green-500 text-white border-green-500"
              >
                Verified
              </Badge>
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
