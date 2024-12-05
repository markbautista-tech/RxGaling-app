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
import { useClinicRequestData } from "../hooks/useClinicRequestData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

const PharmacyDetails = ({ pharma }) => {
  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [cityMuni, setCityMuni] = useState(null);
  const [barangay, setBarangay] = useState(null);

  const [cliregion, setCliRegion] = useState(null);
  const [cliprovince, setCliProvince] = useState(null);
  const [clicityMuni, setCliCityMuni] = useState(null);
  const [clibarangay, setCliBarangay] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const bar = await getBarangayName(pharma.users?.addresses?.barangay);
      const cityMuni = await getCityMuniName(pharma.users?.addresses?.city);
      const province = await getProvinceName(pharma.users?.addresses?.province);
      const region = await getRegionName(pharma.users?.addresses?.region);

      const clin_bar = await getBarangayName(pharma.addresses?.barangay);
      const clin_cityMuni = await getCityMuniName(pharma.addresses?.city);
      const clin_province = await getProvinceName(pharma.addresses?.province);
      const clin_region = await getRegionName(pharma.addresses?.region);

      setBarangay(bar);
      setCityMuni(cityMuni);
      setProvince(province);
      setRegion(region);

      setCliBarangay(clin_bar);
      setCliCityMuni(clin_cityMuni);
      setCliProvince(clin_province);
      setCliRegion(clin_region);
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Avatar className="w-[100px] h-[100px] text-xl">
                <AvatarImage src="" />
                <AvatarFallback>{pharma.name[0]}</AvatarFallback>
              </Avatar>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <div>
              <div className="text-lg font-bold lg:text-2xl flex gap-2 items-center">
                <span>{pharma.name}</span>
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
              </div>
              <p className="text-sm text-gray-500">
                License Number: <b>{pharma.license_num}</b>
              </p>
              <div className="py-4">
                <Separator orientation="horizontal" />
              </div>
              <div className="space-y-3">
                <p className="text-lg lg:text-lg font-bold">Owner Details:</p>
                <div>
                  <p className="text-md text-gray-800">Name:</p>
                  <p className="text-md text-gray-500">
                    {`Dr. ${pharma.users?.first_name} ${pharma.users?.middle_name} ${pharma.users?.last_name} ${pharma.users?.suffix === "N/A" ? "" : pharma.users?.suffix}` ||
                      "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-md text-gray-800">Address:</p>
                  <p className="text-md text-gray-500">{`${pharma.users?.addresses?.address_line}, ${barangay}, ${cityMuni}, ${province}, ${region}`}</p>
                </div>
              </div>
              <div className="py-4">
                <Separator orientation="horizontal" />
              </div>
              <div className="space-y-3">
                <p className="text-lg lg:text-lg font-bold">Clinic Details:</p>
                <div>
                  <p className="text-md text-gray-800">Address:</p>
                  <p className="text-md text-gray-500">{`${pharma.addresses?.address_line}, ${clibarangay}, ${clicityMuni}, ${cliprovince}, ${cliregion}`}</p>
                </div>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PharmacyDetails;
