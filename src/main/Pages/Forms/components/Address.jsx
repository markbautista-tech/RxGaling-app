import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
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

const Address = () => {
  const [regions, setRegions] = useState([]);
  const [province, setProvince] = useState([]);
  const [muni, setMuni] = useState([]);
  const [barangay, setBarangay] = useState([]);

  const [address, setAddress] = useState({
    region: "",
    province: "",
    municipality: "",
  });

  useEffect(() => {
    fetch("https://psgc.cloud/api/regions")
      .then((response) => response.json())
      .then((data) => setRegions(data))
      .catch((err) => console.log(err));
  }, []);

  const regionChange = (value) => {
    address.region = value;
    fetch(`https://psgc.cloud/api/regions/${value}/provinces`)
      .then((response) => response.json())
      .then((data) => setProvince(data));
    setMuni([]);
    setBarangay([]);
  };

  const provinceChange = (value) => {
    address.province = value;
    fetch(`https://psgc.cloud/api/provinces/${value}/cities-municipalities`)
      .then((response) => response.json())
      .then((data) => setMuni(data));
  };

  const muniChange = (value) => {
    address.municipality = value;
    fetch(`https://psgc.cloud/api/cities-municipalities/${value}/barangays`)
      .then((response) => response.json())
      .then((data) => setBarangay(data));
  };

  return (
    <>
      <Label className="text-md">Address</Label>
      <div className="space-y-3">
        <div className="grid grid-flow-row lg:grid-flow-col gap-3 w-full">
          <div className="flex-1 grid gap-3">
            <Label htmlFor="region">Region</Label>
            <Select
              id="region"
              value={address.region}
              onValueChange={(value) => regionChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {regions.map((list, index) => (
                    <SelectItem key={list.id} value={list.code}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 grid gap-3">
            <Label htmlFor="region">Province</Label>
            <Select
              id="region"
              onValueChange={(value) => provinceChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {province.map((list, index) => (
                    <SelectItem key={list.id} value={list.code}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-flow-row lg:grid-flow-col gap-3 w-full">
          <div className="flex-1 grid gap-3">
            <Label htmlFor="region">City/Municipality</Label>
            <Select
              id="region"
              value={address.municipality}
              onValueChange={(value) => muniChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select City/Municipality" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {muni.map((list, index) => (
                    <SelectItem key={list.id} value={list.code}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 grid gap-3">
            <Label htmlFor="region">Barangay</Label>
            <Select id="region">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Barangay" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {barangay.map((list, index) => (
                    <SelectItem key={list.id} value={list.code}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Additional Address</Label>
          <Input type="text" placeholder="House No., Street, Building..." />
        </div>
      </div>
    </>
  );
};

export default Address;
