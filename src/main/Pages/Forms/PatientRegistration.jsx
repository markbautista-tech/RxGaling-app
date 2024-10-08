import React, { useEffect, useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import
{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import
{
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Birthday from "./components/Birthday";
import SelectGender from "./components/Gender";
import Address from "./components/Address";


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const schema = z.object({


  // clinicownerdetails:
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  ext_name: z.string(),

  // bday
  month: z.string().optional(),
  day: z.string().optional(),
  year: z.string().optional(),
  age: z.string().optional(),
  contact_num: z.string().optional(),
  email: z.string().email("Invalid email address").trim().optional(),
  gender: z.string().optional(),


  // address:
  region: z.string().optional(),
  province: z.string().optional(),
  municipality: z.string().optional(),
  barangay: z.string().optional(),
  add_address: z.string().optional(),

});


const UserRegistration = () =>
{
  const [ termsAccepted, setTermsAccepted ] = useState(false);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) =>
  {
    try
    {
      console.log(data);
    } catch (error)
    {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="" className="rounded-md border">
              Add Patient
              {/* <IoAddCircle className="w-8 h-8 cursor-pointer lg:w-10 lg:h-10" /> */}
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:w-[80%] pb-[100px] lg:pb-10 ">
            <DialogHeader>
              <DialogTitle className="lg:text-2xl">Add New Patient</DialogTitle>
              <DialogDescription>
                Please fill up all important inputs.
                {/* <div className="py-5">
                <Separator orientation="horizontal" />
                </div> */}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 lg:space-y-5">
              <div className="lg:flex gap-3 items-center">
                <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                  <div className="">
                    <Label htmlFor="fname">First Name</Label>
                    <Input  {...register("first_name")} type="text" placeholder="Juan" />
                    {errors.first_name && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="mname">Middle Name</Label>
                    <Input {...register("middle_name")} type="text" placeholder="Manansala" />
                    {errors.middle_name && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.middle_name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lname">Last Name</Label>
                    <Input {...register("last_name")} type="text" placeholder="Dela Cruz" />
                    {errors.last_name && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:w-28">
                  <Label htmlFor="ename">Ext. Name</Label>
                  <Input {...register("ext_name")} type="text" placeholder="Sr Jr I II III" />
                  {errors.ext_name && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.ext_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {/* <div>
                  <Label className="text-md">Birthday</Label>
                </div> */}
                <div className="lg:flex gap-3 lg:items-center">
                  <div className="flex-1 pb-3 lg:p-0">
                    <Birthday
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>Email</Label>
                  <Input  {...register("email_add")}
                    type="email" placeholder="example@gmail.com" />
                  {errors.email && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Mobile Number</Label>
                  <Input    {...register("contact_num")} type="number" placeholder="" />
                  {errors.contact_num && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.contact_num.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <SelectGender register={register}
                    control={control}
                    errors={errors} />
                </div>
              </div>


              <div>
                <Address
                  register={register}
                  control={control}
                  errors={errors}
                />
              </div>

            </div>
            <DialogFooter>
              <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end py-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(checked) => setTermsAccepted(checked)}
                  />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <Button
                  variant="secondary"
                  className="border border-primary w-full lg:w-24"
                >
                  Cancel
                </Button>
                <Button className="w-full lg:w-24" disabled={!termsAccepted} type="submit">
                  Register
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};

export default UserRegistration;
