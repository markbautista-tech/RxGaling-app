import { User } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const getRegionName = async (regionId) => {
  try {
    const response = await fetch(`https://psgc.cloud/api/regions/${regionId}`);
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProvinceName = async (provinceId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCityMuniName = async (cityMuniId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBarangayName = async (barangayId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ShowDetails = ({ doctor }) => {
  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [cityMuni, setCityMuni] = useState(null);
  const [barangay, setBarangay] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const bar = await getBarangayName(doctor.users?.addresses?.barangay);
      const cityMuni = await getCityMuniName(doctor.users?.addresses?.city);
      const province = await getProvinceName(doctor.users?.addresses?.province);
      const region = await getRegionName(doctor.users?.addresses?.region);

      setBarangay(bar);
      setCityMuni(cityMuni);
      setProvince(province);
      setRegion(region);
    };
    fetchAddress();
  }, []);

  return (
    <>
      <Sheet>
        <SheetTrigger className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
          <User className="h-4 w-4" />
          <span className="text-xs lg:text-sm">View Details</span>
        </SheetTrigger>
        <SheetContent className=" overflow-y-auto no-scrollbar">
          <SheetHeader>
            <SheetTitle>
              <Avatar className="w-[100px] h-[100px] text-[50px] shadow-lg border text-gray-700">
                <AvatarImage src="" />
                <AvatarFallback>
                  {doctor.users?.last_name?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </SheetTitle>
            <SheetDescription className="text-black flex flex-col text-left">
              <span className="font-bold text-2xl">
                {`Dr. ${doctor.users?.last_name}, ` || "Unknown"}{" "}
              </span>
              <span className="font-bold text-lg">
                {`${doctor.users?.first_name} ${doctor.users?.middle_name}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                  "Unknown"}{" "}
              </span>

              <span className="text-primary text-lg font-bold">
                {doctor.clinics?.name}
              </span>
              <span className="text-gray-600 text-sm">
                {doctor.role} {"  |  "}
                {doctor.users?.doctor_details[0]?.specialization ||
                  "Not specified"}
              </span>
              <span className="text-gray-600 text-sm">
                {`${doctor.working_days} | ${doctor.working_hours}` ||
                  "Schedule not available"}
              </span>
            </SheetDescription>
            <div className="py-3">
              <Separator orientation="horizontal" />
            </div>
            <div className=" flex flex-col gap-3">
              {" "}
              <div className="flex flex-col">
                <span className="font-bold text-sm">Birthdate:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {new Date(doctor.users?.birthdate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Email:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {doctor.users?.email || "Not specified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Contact Number:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {doctor.users?.mobile_number || "Not specified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">License Number:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {doctor.users?.doctor_details[0]?.license_number ||
                    "Not specified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">PRC Number:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {doctor.users?.doctor_details[0]?.prc_number ||
                    "Not specified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">PTR Number:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {doctor.users?.doctor_details[0]?.ptr_number ||
                    "Not specified"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">S2 License Number:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {doctor.users?.doctor_details[0]?.s2_number ||
                    "Not specified"}
                </span>
              </div>
              <div className="py-3">
                <Separator orientation="horizontal" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Address:</span>
                <span className="bg-gray-200 p-1 ps-3 border rounded-md shadow-sm text-sm">
                  {`${doctor.users?.addresses?.address_line}, ${barangay}, ${cityMuni}, ${province}, ${region}` ||
                    "Not specified"}
                </span>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ShowDetails;
