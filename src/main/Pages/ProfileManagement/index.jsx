import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { Label, Button, Input } from "@/components/ui";

const Profilemgmtschema = z.object({


  // clinicownerdetails:
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  contact_num: z.string(),
  email_add: z.string().email("Invalid email address").trim().optional(),


  // address:
  // owner_id: z.string(),
  region: z.string(),
  province: z.string(),
  city_mun: z.string(),
  barangay: z.string(),
  add_address: z.string(),

  // clinic details:
  name: z.string(),
  owner_id: z.string().optional(),
  // uuid: z.optional(z.string()),

  // address:
  // clinic_id: z.string(),
  // region: z.string(),
  // province: z.string(),
  // city_mun: z.string(),
  // barangay: z.string(),
  // add_address: z.string(),

  // clinic_acc:
  clinic_id: z.string().optional(),
  username: z.string(),
  pass: z.string(),
  license_key: z.string(),


  // email: z.string().email("Invalid email address").trim(),
  // role: z.string().min(1, { message: "Clinic Rolse is required." }),
});




const ProfileManagement = () =>
{
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Profilemgmtschema),
  });
  // const suibmitForm = handleSubmit((data) =>
  // {
  //   console.log(data);
  // })
  const onSubmit = (data) =>
  {
    try {
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    console.log({errors})
  },[errors])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 p-0 m-0 ">

          <div className="">
            <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
              Clinic Owner Account Management
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <Label>Username </Label>
                <Input
                  {...register("username")}
                  placeholder=""
                />
                {errors.username && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label>Password</Label>
                <Input autoComplete="on" type="password" {...register("pass")} />
                {errors.pass && (
                  <p className="text-destructive">{errors.pass.message}</p>
                )}
              </div>

              <div className="">
                <Label>License Key</Label>
                <Input
                  {...register("license_key")}
                  placeholder=""
                />
                {errors.license_key && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.license_key.message}
                  </p>
                )}
              </div>

            </div>
          </div>
          <div className="">
            <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
              Clinic Owner Profile Management
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <Label>Firstname</Label>
                <Input
                  {...register("first_name")}
                  placeholder=""
                />
                {errors.first_name && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label>Middlename</Label>
                <Input
                  {...register("middle_name")}
                  placeholder=""
                />
                {errors.middle_name && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.middle_name.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Lastname</Label>
                <Input
                  {...register("last_name")}
                  placeholder=""
                />
                {errors.last_name && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Contact No.</Label>
                <Input
                  {...register("contact_num")}
                  placeholder=""
                />
                {errors.contact_num && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.contact_num.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Email</Label>
                <Input
                  {...register("email_add")}
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
          </div>

          <div className="">
            <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
              Clinic Owner Additional Details Management
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <Label>Region </Label>
                <Input
                  {...register("region")}
                  placeholder=""
                />
                {errors.region && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.region.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Province</Label>
                <Input
                  {...register("province")}
                  placeholder=""
                />
                {errors.province && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>City/Municipality</Label>
                <Input
                  {...register("city_mun")}
                  placeholder=""
                />
                {errors.city_mun && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.city_mun.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Barangay</Label>
                <Input
                  {...register("barangay")}
                  placeholder=""
                />
                {errors.barangay && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.barangay.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label>Additional Address </Label>
                <Input
                  {...register("add_address")}
                  placeholder=""
                />
                {errors.add_address && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.add_address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
              Clinic Profile Management
            </div>
            <div className="">
              <div className="">
                <Label>Clinic Name </Label>
                <Input
                  {...register("name")}
                  placeholder=""
                />
                {errors.name && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="">
                  <Label>Region </Label>
                  <Input
                    {...register("region")}
                    placeholder=""
                  />
                  {errors.region && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.region.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <Label>Province</Label>
                  <Input
                    {...register("province")}
                    placeholder=""
                  />
                  {errors.province && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.province.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <Label>City/Municipality</Label>
                  <Input
                    {...register("city_mun")}
                    placeholder=""
                  />
                  {errors.city_mun && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.city_mun.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <Label>Barangay</Label>
                  <Input
                    {...register("barangay")}
                    placeholder=""
                  />
                  {errors.barangay && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.barangay.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label>Additional Address </Label>
                  <Input
                    {...register("add_address")}
                    placeholder=""
                  />
                  {errors.add_address && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.add_address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="flex space-x-2">
          <Button type="submit" className="w-full" > Save </Button>
          <Button type="reset" variant="destructive" className="w-full"> Reset </Button>
        </div>
      </form>
    </>
  )
}

export default ProfileManagement






