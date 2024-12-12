import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";
import useGetPartnerPharmacy from "../hooks/useGetPartnerPharmacy";
import { SkeletonLoading } from "@/main/components/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnerActions from "./PartnerActions";

const PartnerPharmacyTable = () => {
  const { partnerPharmacy, partnerLoading } = useGetPartnerPharmacy();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const filteredAndSortedPartner = useMemo(() => {
    let filteredPartner = Array.isArray(partnerPharmacy)
      ? partnerPharmacy.filter((partner) => {
          const matchesSearch = partner.pharmacy?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return matchesSearch;
        })
      : [];

    if (sortConfig.key) {
      filteredPartner.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toLowerCase() ?? "";
        const bValue = b[sortConfig.key]?.toLowerCase() ?? "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredPartner;
  }, [partnerPharmacy, searchTerm, sortConfig]);

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
      <div>
        <Input
          type="text"
          placeholder="Search clinic name..."
          className="text-xs lg:text-sm w-full lg:w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Table className="min-w-[90%]">
          <TableHeader>
            <TableRow>
              <TableHead className=""></TableHead>
              <TableHead className="lg:table-cell text-xs lg:text-sm">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="font-bold text-xs lg:text-sm"
                >
                  Pharmacy Name{" "}
                  <ArrowUpDown className="ml-2 h-4 w-4 text-xs lg:text-sm" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell text-xs lg:text-sm">
                Partnered When
              </TableHead>
              <TableHead className="text-xs lg:text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnerLoading ? (
              <SkeletonLoading />
            ) : filteredAndSortedPartner.length > 0 ? (
              filteredAndSortedPartner.map((partner, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src="https://example.com/clinic-image.jpg" />
                      <AvatarFallback>
                        {partner.pharmacy?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="lg:table-cell text-xs lg:text-sm">
                    {partner.pharmacy?.name}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs lg:text-sm">
                    {new Date(partner.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>

                  <TableCell>
                    <PartnerActions partner={partner} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center p-4">
                  No Partners Pharmacy records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default PartnerPharmacyTable;
