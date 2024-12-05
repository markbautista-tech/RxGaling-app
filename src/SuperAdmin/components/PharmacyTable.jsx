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
import { SkeletonLoading } from "@/main/components/Skeleton";
import usePharmacyDetails from "@/PharmacyApp/hooks/usePharmacyDetails";
import PharmacyAction from "./PharmacyAction";

const PharmacyTable = () => {
  const { pharmacyDetails, loading } = usePharmacyDetails();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const filteredAndSortedPharmacy = useMemo(() => {
    let filteredPharmacy = Array.isArray(pharmacyDetails)
      ? pharmacyDetails.filter((pharma) => {
          const matchesSearch = pharma.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesStatus =
            filterStatus === "All" ||
            pharma.status.toLowerCase() === filterStatus.toLowerCase();
          return matchesSearch && matchesStatus;
        })
      : [];

    if (sortConfig.key) {
      filteredPharmacy.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toLowerCase() ?? "";
        const bValue = b[sortConfig.key]?.toLowerCase() ?? "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredPharmacy;
  }, [pharmacyDetails, searchTerm, filterStatus, sortConfig]);

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
            <SelectItem value="Declined">Declined</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
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
                Pharmacy Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Owner Name</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <SkeletonLoading />
          ) : filteredAndSortedPharmacy.length > 0 ? (
            filteredAndSortedPharmacy.map((pharma, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src="https://example.com/clinic-image.jpg" />
                    <AvatarFallback>{pharma.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="lg:table-cell">{pharma.name}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  Dr. {pharma.users?.first_name}{" "}
                  {pharma.users?.middle_name?.charAt(0)}
                  {". "}
                  {pharma.users?.last_name} {pharma.users?.suffix}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge
                    variant=""
                    className={`${
                      pharma.status.toLowerCase() === "archived"
                        ? "bg-gray-500"
                        : pharma.status.toLowerCase() === "declined"
                          ? "bg-red-500"
                          : "bg-green-500"
                    } text-white`}
                  >
                    {pharma.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <PharmacyAction pharma={pharma} />
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

export default PharmacyTable;
