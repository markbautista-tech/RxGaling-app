import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

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

const ClinicAddress = ({ register, control, errors }) => {
  const [regions, setRegions] = useState([]);
  const [province, setProvince] = useState([]);
  const [muni, setMuni] = useState([]);
  const [barangay, setBarangay] = useState([]);

  const [address, _] = useState({
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
      <div>
        <Label className="text-md">Address</Label>
        <div className="space-y-3">
          <div className="grid grid-flow-row lg:grid-flow-col gap-3 w-full">
            <div className="">
              <div className="grid gap-1">
                <Label htmlFor="region">Region</Label>
                <Controller
                  name="clinic_region"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="clinic_region"
                      value={address.region && field.value}
                      onValueChange={(value) => {
                        regionChange(value);
                        field.onChange(value);
                      }}
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
                  )}
                />
              </div>
              {errors.region && (
                <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                  {errors.region.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid gap-1">
                <Label htmlFor="region">Province</Label>
                <Controller
                  name="clinic_province"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="province"
                      value={field.value}
                      onValueChange={(value) => {
                        provinceChange(value);
                        field.onChange(value);
                      }}
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
                  )}
                />
              </div>
              {errors.province && (
                <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                  {errors.province.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-flow-row lg:grid-flow-col gap-3 w-full">
            <div>
              <div className="grid gap-1">
                <Label htmlFor="region">City/Municipality</Label>
                <Controller
                  name="clinic_municipality"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="municipality"
                      value={field.value}
                      onValueChange={(value) => {
                        muniChange(value);
                        field.onChange(value);
                      }}
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
                  )}
                />
              </div>
              {errors.municipality && (
                <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                  {errors.municipality.message}
                </p>
              )}
            </div>
            <div>
              <div className="grid gap-1">
                <Label htmlFor="region">Barangay</Label>
                <Controller
                  name="clinic_barangay"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="barangay"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
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
                  )}
                />
              </div>
              {errors.barangay && (
                <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                  {errors.barangay.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Additional Address</Label>
            <Input
              {...register("clinic_additional_address")}
              type="text"
              placeholder="House No., Street, Building..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicAddress;
