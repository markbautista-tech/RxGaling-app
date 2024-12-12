"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

import { FaBars } from "react-icons/fa6";
import PatientAction from "./PatientAction";
import usePatientData from "../hooks/usePatientData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";

const ITEMS_PER_PAGE = 10;

const PatientTable = () => {
  const { role } = useUser();
  const { patientData } = usePatientData();
  const [patients, setPatients] = useState(patientData);
  const [sortConfig, setSortConfig] = useState({
    key: "last_name",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(patients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = patients.slice(startIndex, endIndex);

  useEffect(() => {
    const sortedPatients = [...patientData].sort((a, b) => {
      if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1;
      if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1;
      return 0;
    });
    setPatients(sortedPatients);
  }, [patientData]);

  const sortBy = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sortedPatients = [...patientData];
    if (sortConfig.key) {
      sortedPatients.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTerm) {
      sortedPatients = sortedPatients.filter(
        (patient) =>
          patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.id_number.toString().includes(searchTerm)
      );
    }
    setPatients(sortedPatients);
  }, [sortConfig, searchTerm, patientData]);

  return (
    <div className="py-4">
      <div className="flex justify- items-center gap-5">
        <Input
          type="text"
          placeholder="Search patient's last name or ID number"
          className="mb-4 text-xs lg:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <div className="flex items-center gap-3 mb-4">
          <Switch id="show-archive" />
          <Label htmlFor="show-archive" className="text-xs w-full text-nowrap">
            Show Archive
          </Label>
        </div> */}
      </div>
      <div className="">
        <Table className="border-t-2 border-primary mt-4">
          <TableHeader className="text-sm">
            <TableRow>
              <TableHead className="w-[50px] text-primary">
                <Button
                  variant="ghost"
                  onClick={() => sortBy("id_number")}
                  className="font-bold text-xs lg:text-sm"
                >
                  ID Number <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-primary">
                <Button
                  variant="ghost"
                  onClick={() => sortBy("last_name")}
                  className="font-bold text-xs lg:text-sm"
                >
                  Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              {/* Use hidden on small screens, visible on larger screens */}
              <TableHead className="text-primary font-bold hidden lg:table-cell">
                Age
              </TableHead>
              <TableHead className="text-primary font-bold hidden lg:table-cell">
                Gender
              </TableHead>
              {role !== "Owner" && <TableHead className=""></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {currentData.length > 0 ? (
              currentData.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="cursor-pointer text-xs lg:text-sm"
                >
                  <TableCell className="text-center">
                    {patient.id_number}
                  </TableCell>
                  <TableCell className="text-xs lg:text-sm flex lg:flex-row lg:items-center lg:gap-2 text-wrap">
                    <span className="font-bold lg:text-lg">
                      {patient.last_name}
                      {", "}
                    </span>
                    <span>{`${patient.first_name} ${patient.middle_name[0]}. ${patient.suffix || ""}`}</span>
                  </TableCell>
                  {/* Hide on small screens, visible only on large screens */}
                  <TableCell className="text-xs lg:text-sm hidden lg:table-cell">
                    {patient.age}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {patient.gender}
                  </TableCell>
                  {role !== "Owner" && (
                    <TableCell className="text-center">
                      <PatientAction patient={patient} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              // Display this row when there are no records
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  No patient records available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent className="flex items-center space-x-2">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((page) => Math.max(page - 1, 1));
                }}
                aria-disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-purple-600"
                }`}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>

            {/* Page Numbers with Hidden Previous Number */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;

              // Display logic for ellipses and page numbers
              const isFirstPage = pageNumber === 1;
              const isLastPage = pageNumber === totalPages;
              const isCurrentPage = pageNumber === currentPage;
              const isNextPage = pageNumber === currentPage + 1;

              // Hide the "previous" page
              if (pageNumber === currentPage - 1) {
                return null;
              }

              if (
                !isFirstPage &&
                !isLastPage &&
                !isCurrentPage &&
                !isNextPage
              ) {
                return (
                  <PaginationItem key={pageNumber} className="hidden sm:block">
                    <span className="px-3 py-1 text-gray-500">...</span>
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNumber);
                    }}
                    className={`px-3 py-1 border rounded-md ${
                      isCurrentPage
                        ? "bg-purple-600 text-white"
                        : "text-purple-600 hover:bg-purple-100"
                    }`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((page) => Math.min(page + 1, totalPages));
                }}
                aria-disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-purple-600"
                }`}
              >
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PatientTable;
