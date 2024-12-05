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
import useCompleteClinicDetails from "../hooks/useCompleteClinicDetails";

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

const getCliRegionName = async (regionId) => {
  try {
    const response = await fetch(`https://psgc.cloud/api/regions/${regionId}`);
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCliProvinceName = async (provinceId) => {
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

const getCliCityMuniName = async (cityMuniId) => {
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

const getCliBarangayName = async (barangayId) => {
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

const ViewDetails = ({ clinic }) => {
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
      const bar = await getBarangayName(clinic.users?.addresses?.barangay);
      const cityMuni = await getCityMuniName(clinic.users?.addresses?.city);
      const province = await getProvinceName(clinic.users?.addresses?.province);
      const region = await getRegionName(clinic.users?.addresses?.region);

      const clin_bar = await getBarangayName(clinic.addresses?.barangay);
      const clin_cityMuni = await getCityMuniName(clinic.addresses?.city);
      const clin_province = await getProvinceName(clinic.addresses?.province);
      const clin_region = await getRegionName(clinic.addresses?.region);

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
                <AvatarFallback>{clinic.name[0]}</AvatarFallback>
              </Avatar>
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <div>
              <div className="text-lg font-bold lg:text-2xl flex gap-2 items-center">
                <span>{clinic.name}</span>
                <Badge
                  variant=""
                  className={`${
                    clinic.status.toLowerCase() === "archived"
                      ? "bg-gray-500"
                      : clinic.status.toLowerCase() === "deactivated"
                        ? "bg-red-500"
                        : clinic.status.toLowerCase() === "declined"
                          ? "bg-red-500"
                          : "bg-green-500"
                  } text-white`}
                >
                  {clinic.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                License Number: <b>{clinic.license_num}</b>
              </p>
              <div className="py-4">
                <Separator orientation="horizontal" />
              </div>
              <div className="space-y-3">
                <p className="text-lg lg:text-lg font-bold">Owner Details:</p>
                <div>
                  <p className="text-md text-gray-800">Name:</p>
                  <p className="text-md text-gray-500">
                    {`Dr. ${clinic.users?.first_name} ${clinic.users?.middle_name} ${clinic.users?.last_name} ${clinic.users?.suffix === "N/A" ? "" : clinic.users?.suffix}` ||
                      "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-md text-gray-800">Address:</p>
                  <p className="text-md text-gray-500">{`${clinic.users?.addresses?.address_line}, ${barangay}, ${cityMuni}, ${province}, ${region}`}</p>
                </div>
              </div>
              <div className="py-4">
                <Separator orientation="horizontal" />
              </div>
              <div className="space-y-3">
                <p className="text-lg lg:text-lg font-bold">Clinic Details:</p>
                <div>
                  <p className="text-md text-gray-800">Address:</p>
                  <p className="text-md text-gray-500">{`${clinic.addresses?.address_line}, ${clibarangay}, ${clicityMuni}, ${cliprovince}, ${cliregion}`}</p>
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
