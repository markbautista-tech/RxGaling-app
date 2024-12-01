import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registrationSchema } from "../schema/registrationSchema";

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
import useRegForm from "../hooks/useRegForm";

const Address = ({ register, control, errors, existing_address }) => {
  const [regions, setRegions] = useState([]);
  const [province, setProvince] = useState([]);
  const [muni, setMuni] = useState([]);
  const [barangay, setBarangay] = useState([]);

  const [address, setAddress] = useState({
    region: existing_address.region || "",
    province: existing_address.province || "",
    municipality: existing_address.city || "",
    barangay: existing_address.barangay || ""
  });

  useEffect(() => {
    fetch("https://psgc.cloud/api/regions")
      .then((response) => response.json())
      .then((data) => setRegions(data))
      .catch((err) => console.log(err));

    if(existing_address.region){
      regionChange(existing_address.region, true);
    }

    if(existing_address.province, true){
      provinceChange(existing_address.province, true);
    }

    if(existing_address.city, true){
      muniChange(existing_address.city, true);
    }
  }, []);

  const regionChange = (value, upon_load = false) => {
    address.region = value;

    if(!upon_load){
      setAddress({
        ...address,
        province: "",
        municipality: "",
        barangay: ""
      })
    }

    fetch(`https://psgc.cloud/api/regions/${value}/provinces`)
      .then((response) => response.json())
      .then((data) => setProvince(data));
    setMuni([]);
    setBarangay([]);
  };

  const provinceChange = (value, upon_load = false) => {
    address.province = value;

    if(!upon_load){
      setAddress({
        ...address,
        municipality: "",
        barangay: ""
      })
    }

    fetch(`https://psgc.cloud/api/provinces/${value}/cities-municipalities`)
      .then((response) => response.json())
      .then((data) => setMuni(data));
  };

  const muniChange = (value, upon_load = false) => {
    address.municipality = value;

    if(!upon_load){
      setAddress({
        ...address,
        barangay: ""
      })
    }

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
                  name="region"
                  control={control}
                  {...(address.region ? { defaultValue: address.region } : {})}
                  render={({ field }) => (
                    <Select
                      id="region"
                      value={address.region}
                      onValueChange={(value) => {
                        console.log(value)
                        regionChange(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            address.region !== ""
                              ? regions.length
                                ? regions.find(
                                    (region) =>
                                      region.code === address.region
                                  ).name
                                : "Loading..."
                              : "Select Region"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {regions.map((list, index) => (
                            <SelectItem
                              key={list.id}
                              value={list.code}
                              selected={list.code === address.region}
                            >
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
                  name="province"
                  control={control}
                  {...(address.province ? { defaultValue: address.province } : {})}
                  render={({ field }) => (
                    <Select
                      id="province"
                      value={address.province}
                      onValueChange={(value) => {
                        provinceChange(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            address.province !== ""
                              ? province.length
                                ? province.find(
                                    (province) =>
                                      province.code === address.province
                                  ).name
                                : "Loading..."
                              : "Select Province"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {province.map((list, index) => (
                            <SelectItem
                              key={list.id}
                              value={list.code}
                              selected={list.code === address.province}
                            >
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
                  name="municipality"
                  control={control}
                  {...(address.municipality ? { defaultValue: address.municipality } : {})}
                  render={({ field }) => (
                    <Select
                      id="municipality"
                      value={address.municipality}
                      onValueChange={(value) => {
                        muniChange(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            address.municipality !== ""
                              ? muni.length
                                ? muni.find(
                                    (muni) =>
                                      muni.code === address.municipality
                                  ).name
                                : "Loading..."
                              : "Select City/Municipality"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {muni.map((list, index) => (
                            <SelectItem
                              key={list.id}
                              value={list.code}
                              selected={list.code === address.city}
                            >
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
                  name="barangay"
                  control={control}
                  {...(address.barangay ? { defaultValue: address.barangay } : {})}
                  render={({ field }) => (
                    <Select
                      id="barangay"
                      value={address.barangay}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue 
                          placeholder={
                            address.barangay !== ""
                              ? barangay.length
                                ? barangay.find(
                                    (barangay) =>
                                      barangay.code === address.barangay
                                  ).name
                                : "Loading..."
                              : "Select Barangay"
                          }
                        />
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
              {...register("additional_address")}
              type="text"
              placeholder="House No., Street, Building..."
              defaultValue={existing_address.address_line}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
