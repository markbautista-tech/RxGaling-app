import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ClinicActions from "./ClinicActions";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import useCompleteClinicDetails from "../hooks/useCompleteClinicDetails";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClinicsTable = () => {
  const { clinicDetails } = useCompleteClinicDetails();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const filteredAndSortedClinics = useMemo(() => {
    let filteredClinics = Array.isArray(clinicDetails)
      ? clinicDetails.filter((clinic) => {
          const matchesSearch = clinic.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesStatus =
            filterStatus === "All" ||
            clinic.status.toLowerCase() === filterStatus.toLowerCase();
          return matchesSearch && matchesStatus;
        })
      : [];

    if (sortConfig.key) {
      filteredClinics.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toLowerCase() ?? "";
        const bValue = b[sortConfig.key]?.toLowerCase() ?? "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredClinics;
  }, [clinicDetails, searchTerm, filterStatus, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search clinic name..."
          className="text-xs lg:text-sm w-full lg:w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          onValueChange={(value) => setFilterStatus(value)}
          value={filterStatus}
        >
          <SelectTrigger className="w-full lg:w-56 text-xs lg:text-sm">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Verified">Verified</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
            <SelectItem value="Deactivated">Deactivated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table className="min-w-[90%]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-[20px]"></TableHead>
            <TableHead className="lg:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="font-bold"
              >
                Clinic Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Owner Name</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedClinics.length > 0 ? (
            filteredAndSortedClinics.map((clinic, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src="https://example.com/clinic-image.jpg" />
                    <AvatarFallback>{clinic.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="lg:table-cell">{clinic.name}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  Dr. {clinic.users?.first_name}{" "}
                  {clinic.users?.middle_name?.charAt(0)}
                  {". "}
                  {clinic.users?.last_name} {clinic.users?.suffix}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge
                    variant=""
                    className={`${
                      clinic.status.toLowerCase() === "archived"
                        ? "bg-gray-500"
                        : clinic.status.toLowerCase() === "deactivated"
                          ? "bg-red-500"
                          : "bg-green-500"
                    } text-white`}
                  >
                    {clinic.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ClinicActions
                    ownerId={clinic.owner_id}
                    status={clinic.status}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center p-4">
                No Records
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ClinicsTable;
