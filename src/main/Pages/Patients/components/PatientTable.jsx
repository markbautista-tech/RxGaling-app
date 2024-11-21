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
import usePatientData from "../../UserManagement/hooks/usePatientData";
import { FaBars } from "react-icons/fa6";
import PatientAction from "./PatientAction";

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
      });
    }
    if (searchTerm) {
      sortedPatients = sortedPatients.filter((patient) =>
        patient.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setPatients(sortedPatients);
  }, [sortConfig, searchTerm]);

  return (
    <div className="py-4 ">
      <Input
        type="text"
        placeholder="Search patient's lastname"
        className="mb-4 text-xs lg:text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortBy("last_name")}>
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
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
