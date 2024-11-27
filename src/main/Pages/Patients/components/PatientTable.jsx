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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

import { FaBars } from "react-icons/fa6";
import PatientAction from "./PatientAction";
import usePatientData from "../hooks/usePatientData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PatientTable = () => {
  const { patientData } = usePatientData();
  const [patients, setPatients] = useState(patientData);
  const [sortConfig, setSortConfig] = useState({
    key: "last_name",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");

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
        <div className="flex items-center gap-3 mb-4">
          <Switch id="show-archive" />
          <Label htmlFor="show-archive" className="text-xs w-full text-nowrap">
            Show Archive
          </Label>
        </div>
      </div>

      <Table className=" border-t-2 border-primary mt-4 ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]"></TableHead>
            <TableHead className="w-[50px] text-primary">
              <Button
                variant="ghost"
                onClick={() => sortBy("id_number")}
                className="font-bold"
              >
                ID Number <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-primary">
              <Button
                variant="ghost"
                onClick={() => sortBy("last_name")}
                className="font-bold"
              >
                Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-primary font-bold">Age</TableHead>
            <TableHead className="text-primary font-bold">Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="cursor-pointer text-xs lg:text-sm"
            >
              <TableCell>
                <PatientAction />
              </TableCell>
              <TableCell className="text-center">{patient.id_number}</TableCell>
              <TableCell className="text-xs lg:text-sm">{`${patient.last_name}, ${patient.first_name} ${patient.middle_name} ${patient.ext_name}`}</TableCell>
              <TableCell className="text-xs lg:text-sm">
                {patient.age}
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientTable;
