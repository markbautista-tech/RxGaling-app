import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const PharmacyReqAddForm = ({ data }) => {
  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [cityMuni, setCityMuni] = useState(null);
  const [barangay, setBarangay] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const bar = await getBarangayName(data.users?.addresses?.barangay);
      const cityMuni = await getCityMuniName(data.users?.addresses?.city);
      const province = await getProvinceName(data.users?.addresses?.province);
      const region = await getRegionName(data.users?.addresses?.region);

      setRegion(region);
      setProvince(province);
      setCityMuni(cityMuni);
      setBarangay(bar);
    };
    fetchAddress();
  }, []);
  return (
    <>
      <div className="space-y-2">
        <p className="font-bold text-md lg:text-xl">Pharmacy Details</p>
        <div className="">
          <Label htmlFor="clinic">Clinic Name</Label>
          <Input type="text" readOnly value={data.name} />
        </div>
        <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
          <div className="">
            <Label htmlFor="region">Region</Label>
            <Input type="text" readOnly value={region} />
          </div>
          <div className="">
            <Label htmlFor="province">Province</Label>
            <Input type="text" readOnly value={province} />
          </div>
        </div>
        <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
          <div className="">
            <Label htmlFor="city">City/Municipality</Label>
            <Input type="text" readOnly value={cityMuni} />
          </div>
          <div className="">
            <Label htmlFor="barangay">Barangay</Label>
            <Input type="text" readOnly value={barangay} />
          </div>
        </div>
        <div className="">
          <Label htmlFor="add_address">Additional Address</Label>
          <Input type="text" readOnly value={data.addresses?.address_line} />
        </div>
        <div className="">
          <Label htmlFor="add_address">FDA License Number</Label>
          <Input type="text" readOnly value={data.fda_license_num} />
        </div>
      </div>
    </>
  );
};

export default PharmacyReqAddForm;
