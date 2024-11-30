import { User } from "lucide-react";
import React, { useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useClinicRequestData } from "../hooks/useClinicRequestData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useCompleteClinicDetails from "../hooks/useCompleteClinicDetails";

const ViewDetails = ({ ownerId, status }) => {
  const {
    clinicStatus,
    getOwnerID,
    clinicLicense,
    clinicDataName,
    ownerFname,
    ownerEname,
    ownerLname,
    ownerMname,
    regionName,
    provinceName,
    cityMuniName,
    barangayName,
    ownerAddress,
    clinicAddress,
    clinicBarangay,
    clinicCityMuni,
    clinicProvince,
    clinicRegion,
  } = useClinicRequestData();
  const { clinicDetails } = useCompleteClinicDetails();

  useEffect(() => {
    getOwnerID(ownerId);
  }, [ownerId]);

  return (
    <>
      <Sheet>
        <SheetTrigger className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <User className="h-4 w-4" />
          <span className="text-xs lg:text-sm">View Details</span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Avatar className="w-[100px] h-[100px]">
                <AvatarImage src="https://syhqtiahcppwauhrhctz.supabase.co/storage/v1/object/public/Clinic_Storage/16/clinic_pic/16-clinic_pic.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <div>
              <div className="text-lg font-bold lg:text-2xl flex gap-2 items-center">
                {clinicDataName}
                <Badge
                  variant=""
                  className={`${
                    status.toLowerCase() === "archived"
                      ? "bg-gray-500"
                      : status.toLowerCase() === "deactivated"
                        ? "bg-red-500"
                        : "bg-green-500"
                  } text-white`}
                >
                  {status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                License Number: <b>{clinicLicense}</b>
              </p>
              <div className="py-4">
                <Separator orientation="horizontal" />
              </div>
              <div className="space-y-3">
                <p className="text-lg lg:text-lg font-bold">Owner Details:</p>
                <div>
                  <p className="text-md text-gray-800">Name:</p>
                  <p className="text-md text-gray-500">
                    Dr. {ownerFname} {ownerMname?.charAt(0)}
                    {". "}
                    {ownerLname} {ownerEname}
                  </p>
                </div>
                <div>
                  <p className="text-md text-gray-800">Address:</p>
                  <p className="text-md text-gray-500">
                    {ownerAddress}
                    {", "}
                    {barangayName}
                    {", "}
                    {cityMuniName}
                    {", "}
                    {provinceName}
                    {", "}
                    {regionName}
                  </p>
                </div>
              </div>
              <div className="py-4">
                <Separator orientation="horizontal" />
              </div>
              <div className="space-y-3">
                <p className="text-lg lg:text-lg font-bold">Clinic Details:</p>
                <div>
                  <p className="text-md text-gray-800">Address:</p>
                  <p className="text-md text-gray-500">
                    {clinicAddress}
                    {", "}
                    {clinicBarangay}
                    {", "}
                    {clinicCityMuni}
                    {", "}
                    {clinicProvince}
                    {", "}
                    {clinicRegion}
                  </p>
                </div>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewDetails;
