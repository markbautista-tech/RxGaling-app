import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StaffAction from "./StaffAction";
import { Input } from "@/components/ui/input";

const StaffTable = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      role: "Clinic Administrator",
      dateAdded: "10-11-2024",
    },
    { id: 2, name: "Jane Doe", role: "Clinic Nurse", dateAdded: "9-15-2024" },
    {
      id: 3,
      name: "Bob Smith",
      role: "Clinic Secretary",
      dateAdded: "12-06-2024",
    },
    {
      id: 4,
      name: "Bob Marley",
      role: "Clinic Assistant",
      dateAdded: "10-13-2024",
    },
  ];

  const roles = [
    { id: 1, name: "Clinic Administrator" },
    { id: 2, name: "Clinic Nurse" },
    { id: 3, name: "Clinic Secretary" },
    { id: 4, name: "Clinic Assistant" },
  ];

  // State for selected role
  const [selectedRole, setSelectedRole] = useState("All Roles");

  // Filter data based on selected role
  const filteredData =
    selectedRole === "All Roles"
      ? data
      : data.filter((staff) => staff.role === selectedRole);

  return (
    <>
      <div className="mt-4">
        <div className="flex gap-3">
          <Input placeholder="Search staff" />
          <Select
            onValueChange={(value) => setSelectedRole(value)}
            defaultValue="All Roles"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Roles">All Roles</SelectItem>
              {roles.map((item, index) => (
                <SelectItem value={item.name} key={index}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table className="border-t-2 mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="text-primary">Name</TableHead>
              <TableHead className="text-primary">Clinic Role</TableHead>
              <TableHead className="text-primary">Date Added</TableHead>
              <TableHead className="text-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell className="">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-bold">{item.name}</TableCell>
                <TableCell className="">{item.role}</TableCell>
                <TableCell className="">{item.dateAdded}</TableCell>
                <TableCell className="">
                  <StaffAction />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StaffTable;
