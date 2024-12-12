import React, { useState, useMemo } from "react";
import useFetchMedicines from "../hooks/useFetchMedicines";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { SkeletonLoading } from "@/main/components/Skeleton";

const MedicineTable = () => {
  const { medLoading, medicines } = useFetchMedicines();

  // State for search and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" or "desc"

  // Handle search input change
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Sort by name
  const sortByName = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  // Filtered and sorted medicines
  const filteredAndSortedMedicines = useMemo(() => {
    // Ensure `medicines` is an array
    if (!Array.isArray(medicines)) {
      return []; // Return an empty array if `medicines` is not an array
    }

    // Filter medicines based on the search query
    const filtered = medicines.filter((medicine) =>
      medicine.generic_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered medicines based on the sort direction
    return filtered.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.generic_name.localeCompare(b.generic_name);
      }
      return b.generic_name.localeCompare(a.generic_name);
    });
  }, [medicines, searchQuery, sortDirection]);

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="py-4 px-5">
        <Input
          placeholder="Search medicines..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {/* Table */}
        <Table className="lg:px-5">
          <TableHeader className="w-full">
            <TableRow>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={sortByName}
                  className="font-bold flex items-center text-primary"
                >
                  Generic Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Brand Name</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Exp. Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medLoading ? (
              <SkeletonLoading />
            ) : filteredAndSortedMedicines.length > 0 ? (
              filteredAndSortedMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell className="text-left">
                    {medicine.generic_name}
                  </TableCell>
                  <TableCell>{medicine.brand_name}</TableCell>
                  <TableCell>{medicine.dosage}</TableCell>
                  <TableCell>{medicine.quantity}</TableCell>
                  <TableCell>{medicine.selling_price}</TableCell>
                  <TableCell>{medicine.expiry_date}</TableCell>
                </TableRow>
              ))
            ) : (
              // Show "No medicines found" if the list is empty
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No medicines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MedicineTable;
