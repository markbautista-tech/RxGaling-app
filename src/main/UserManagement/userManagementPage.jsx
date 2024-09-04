import React, { useState } from "react";
import ContentTitle from "../components/contentTitle";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { MdOutlineArchive } from "react-icons/md";
import { PiUserListBold } from "react-icons/pi";
import { BiSearchAlt } from "react-icons/bi";
import SearchBar from "../components/search";

const UserManagementPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortByChange = (sort) => {
    setSortBy(sort);
  };
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSortBy("featured");
  };

  const categories = [
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Home & Garden", value: "home-garden" },
    { label: "Beauty & Personal Care", value: "beauty-personal-care" },
    { label: "Sports & Outdoors", value: "sports-outdoors" },
  ];

  return (
    <>
      <ContentTitle title="User Management" />

      <div className="flex gap-5 items-center justify-end mr-5">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
        <div className="grid gap-2">
          <Select id="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel value="clinicrole">Clinic Role</SelectLabel>
                <SelectItem value="apple">Family Medicine Doctor</SelectItem>
                <SelectItem value="banana">General Doctor</SelectItem>
                <SelectItem value="blueberry">
                  Internal Medicine Doctor
                </SelectItem>
                <SelectItem value="grapes">Clinic Staff</SelectItem>
                <SelectItem value="pineapple">Pharmacist</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SearchBar />
      </div>

      <div className="flex justify-center w-full gap-7 p-5 h-96">
        <div className="border-2 p-3 rounded-md shadow-md">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-black">
                    Profile
                  </TableHead>
                  <TableHead className="w-[250px] text-black">Name</TableHead>
                  <TableHead className="w-[150px] text-black">
                    Clinic Role
                  </TableHead>
                  <TableHead className="w-[150px] text-black">Status</TableHead>
                  <TableHead className="w-[80px] text-black">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-200">
                  <TableCell className="font-medium">
                    <div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell>Dr. Juan Dela Cruz</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-500">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <MdOutlineArchive className="w-5 h-5 text-destructive" />
                      <PiUserListBold className="w-5 h-5 text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-primary p-3 rounded-md w-1/3 h-full shadow-md">
          <p className="text-white font-semibold py-3">Requests</p>
          <Separator className="bg-gray-400" />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default UserManagementPage;
