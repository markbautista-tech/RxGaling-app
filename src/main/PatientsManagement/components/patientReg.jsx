import React, { useEffect, useState } from "react";

import "/src/main/PatientsManagement/styles/patientReg.css";

import { TbCircleArrowLeftFilled } from "react-icons/tb";
import ContentTitle from "../../components/contentTitle";

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

const PatientRegistration = () => {
  const [isOtherGender, setIsOtherGender] = useState("");

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
      <div className="flex justify-center gap-3">
        <div className="flex-1 flex-col flex items-center justify-center gap-5  max-w-[60%] ">
          <div className="absolute top-10 left-10">
            <TbCircleArrowLeftFilled className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-col flex items-center gap-y-5 w-full ">
            <div>
              <ContentTitle title="Patient Registration" />
            </div>
            <div className="py-3 w-full">
              <form className="flex-col flex gap-5">
                <div className="flex gap-3">
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="fname">First Name</Label>
                    <Input id="fname" placeholder="Juan" />
                  </div>
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="mname">Middle Name</Label>
                    <Input id="mname" placeholder="De la" />
                  </div>
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input id="lname" placeholder="Cruz" />
                  </div>
                  <div className="grid gap-2 max-w-28">
                    <Label htmlFor="extname">Ext. Name</Label>
                    <Input id="extname" placeholder="Sr, Jr, I, II" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className=" flex-1 grid gap-2">
                    <Label htmlFor="bday">Birthday</Label>
                    <Input type="date" id="bday" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input type="number" id="age" />
                  </div>
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      id="gender"
                      value={isOtherGender}
                      onValueChange={setIsOtherGender}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {isOtherGender === "other" && (
                    <div className="grid gap-2">
                      <Label htmlFor="genOther">Please specify gender</Label>
                      <Input id="genOther" />
                    </div>
                  )}
                </div>
                <div className="flex gap-5 w-full">
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" />
                  </div>
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="mobnum">Mobile Number</Label>
                    <Input type="number" id="mobnum" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nation">Nationality</Label>
                  <Input id="nation" />
                </div>

                <div className="flex gap-5 w-full">
                  <div className="flex-1 grid gap-2">
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
                  <div className="flex-1 grid gap-2">
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

                <div className="flex gap-5 w-full">
                  <div className="flex-1 grid gap-2">
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
                  <div className="flex-1 grid gap-2">
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
              </form>
            </div>
          </div>
        </div>

        {/* <div className="flex-1 flex-center-all">
          <img
            src="src/assets/undraw_personal_information_re_vw8a.svg"
            alt=""
          />
        </div> */}
      </div>
    </>
  );
};

export default PatientRegistration;
