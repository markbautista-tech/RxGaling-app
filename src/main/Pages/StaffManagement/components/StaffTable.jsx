import React, { useState } from "react";
import {
  Table,
  TableBody,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StaffAction from "./StaffAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import useUserDetails from "../hooks/useUserDetails";

const StaffTable = () => {
  const { role } = useUser();
  const { userClinics: rawUserClinics } = useUserDetails();

  // Ensure userClinics is always an array
  const userClinics = Array.isArray(rawUserClinics) ? rawUserClinics : [];

  // Exclude "Owner" from userClinics
  const filteredUserClinics = userClinics.filter(
    (staff) => staff.role !== "Owner"
  );

  // Static array for filtering status
  const statuses = ["Accepted", "Archived", "Pending"];
  const roles = [
    "Clinic Administrator",
    "Clinic Nurse",
    "Clinic Secretary",
    "Clinic Assistant",
  ];

  // State for search, sorting, and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [sortOrder, setSortOrder] = useState({ field: "name", asc: true });

  // Sorting logic
  const sortBy = (field) => {
    setSortOrder((prev) => ({
      field,
      asc: prev.field === field ? !prev.asc : true,
    }));
  };

  const sortedData = [...filteredUserClinics]
    .filter((staff) =>
      staff.users?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (staff) =>
        selectedStatus === "All Status" || staff.status === selectedStatus
    )
    .filter(
      (staff) => selectedRole === "All Roles" || staff.role === selectedRole
    )
    .sort((a, b) => {
      const fieldA = a.users?.[sortOrder.field] || "";
      const fieldB = b.users?.[sortOrder.field] || "";
      if (fieldA < fieldB) return sortOrder.asc ? -1 : 1;
      if (fieldA > fieldB) return sortOrder.asc ? 1 : -1;
      return 0;
    });

  return (
    <div className="mt-4">
      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Search staff"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          onValueChange={(value) => setSelectedRole(value)}
          defaultValue="All Roles"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Roles">All Roles</SelectItem>
            {roles.map((role, index) => (
              <SelectItem value={role} key={index}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setSelectedStatus(value)}
          defaultValue="All Status"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            {statuses.map((status, index) => (
              <SelectItem value={status} key={index}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table className="border-t-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => sortBy("first_name")}
                className="font-bold flex items-center"
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-primary">Clinic Role</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((staff, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell className="">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {staff.users?.first_name?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-bold">
                  {staff.users?.first_name || "Unknown"}
                </TableCell>
                <TableCell className="">{staff.role}</TableCell>
                <TableCell className="">{staff.status}</TableCell>
                <TableCell className="">
                  <StaffAction />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center p-4">
                No staff found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffTable;
