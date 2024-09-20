import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ContentTitle from "../../PageContent/ContentTitle";

import { registrationSchema } from "./schema/registrationSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Birthday from "./components/Birthday";
import SelectGender from "./components/Gender";
import Address from "./components/Address";

const DoctorRegistration = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [age, setAge] = useState(null);

  // Watch for the "year" field to calculate age
  // const birthYear = watch("year");

  // Compute age when year changes
  // const calculateAge = (year) => {
  //   const currentYear = new Date().getFullYear();
  //   return currentYear - year;
  // };

  const [address, setAddress] = useState({
    region: "",
    province: "",
    municipality: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      region: address?.region || "",
      province: "",
      municipality: "",
      barangay: "",
      additionalAddress: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="p-5 lg:p-10">
        <div className="py-5 lg:px-24">
          <ContentTitle title={"Registration"} />
        </div>
        <div className="lg:px-36">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="shadow-md">
              <CardHeader>
                {/* <CardTitle>Card Title</CardTitle> */}
                <CardDescription className="italic">
                  Please fill up all important inputs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 lg:space-y-5">
                  <div className="lg:flex gap-3 items-start">
                    <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                      <div className="">
                        <Label htmlFor="fname">First Name</Label>
                        <Input
                          {...register("fname")}
                          type="text"
                          placeholder="Juan"
                        />
                        {errors.fname && (
                          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                            {errors.fname.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="mname">Middle Name</Label>
                        <Input
                          {...register("mname")}
                          type="text"
                          placeholder="Manansala"
                        />
                        {errors.mname && (
                          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                            {errors.mname.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <Input
                          {...register("lname")}
                          type="text"
                          placeholder="Dela Cruz"
                        />
                        {errors.lname && (
                          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                            {errors.lname.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="">
                      <Label htmlFor="ename">Ext. Name</Label>
                      <Input
                        {...register("extname")}
                        type="text"
                        placeholder="Sr Jr I II III"
                      />
                      {errors.extname && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.extname.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <div className="py-3">
                    <Separator orientation="horizontal" />
                  </div> */}
                  <div>
                    <div>
                      <Label className="text-md">Birthday</Label>
                    </div>
                    <div className="lg:flex gap-3 lg:items-center">
                      <div className="flex-1 pb-3 lg:p-0">
                        <Birthday />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div className="w-full">
                      <SelectGender control={control} errors={errors.gender} />
                    </div>

                    <div>
                      <Label>Mobile Number</Label>
                      <Input
                        {...register("contact_num")}
                        type="number"
                        placeholder=""
                      />
                      {errors.contact_num && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.contact_num.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="example@gmail.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Address />
                  </div>

                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label>License Number</Label>
                      <Input
                        {...register("license_num")}
                        type="text"
                        placeholder=""
                      />
                      {errors.license_num && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.license_num.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Specialty</Label>
                      <Input
                        {...register("specialty")}
                        type="text"
                        placeholder=""
                      />
                      {errors.specialty && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.specialty.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label>PTR Number</Label>
                      <Input
                        {...register("ptr_num")}
                        type="text"
                        placeholder=""
                      />
                      {errors.ptr_num && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.ptr_num.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>S2 License Number</Label>
                      <Input
                        {...register("s2_license_num")}
                        type="text"
                        placeholder=""
                      />
                      {errors.s2_license_num && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.s2_license_num.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(checked) => setTermsAccepted(checked)}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  {/* <Button
                    variant="secondary"
                    className="border border-primary w-full lg:w-24"
                  >
                    Cancel
                  </Button> */}
                  <Button
                    type="submit"
                    className="w-full lg:w-24"
                    disabled={!termsAccepted}
                  >
                    Register
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorRegistration;
