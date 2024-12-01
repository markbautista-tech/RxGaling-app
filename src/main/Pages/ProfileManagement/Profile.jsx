import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectGender from "../Forms/components/Gender";
import NewBirthday from "../Forms/components/NewBirthday";
import Address from "../Forms/components/Address";
import { useUser } from "@/context/UserContext";
import { useUserDetails } from "@/utils/data/fetch/fetchUserDetails";
import useUpdateProfile from "@/utils/data/update/useUpdateProfile";
// import { Label, Button, Input } from "@/components/ui";

const ProfileManagement = () =>
{
  const { user } = useUser();
  const { data: userDetails, isLoading } = useUserDetails(user.id);

  const {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    onSubmit,
    loading
  } = useUpdateProfile(userDetails);

  return (
    isLoading ? <div>Loading...</div> :
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("user_id")} value={parseInt(userDetails.id)} />
        <input type="hidden" {...register("address_id")} value={parseInt(userDetails.address.id)} />
        <div className="my-4 p-0 m-0 ">
          <div className="">
            <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
              Manage Profile
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <Label>Firstname</Label>
                <Input
                  {...register("first_name")}
                  placeholder=""
                  defaultValue={userDetails.first_name}
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
                  defaultValue={userDetails.middle_name}
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
                  defaultValue={userDetails.last_name}
                />
                {errors.last_name && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Suffix</Label>
                <Input
                  {...register("suffix")}
                  placeholder=""
                  defaultValue={userDetails.suffix}
                />
                {errors.suffix && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.suffix.message}
                  </p>
                )}
              </div>

              <div className="">
                <Label>Mobile Number</Label>
                <Input
                  {...register("mobile_number")}
                  placeholder=""
                  defaultValue={userDetails.mobile_number}
                />
                {errors.mobile_number && (
                  <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                    {errors.mobile_number.message}
                  </p>
                )}
              </div>

              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <SelectGender errors={errors} control={control} gender={userDetails.gender} />
              </div>
              <NewBirthday
                errors={errors}
                control={control}
                watch={watch}
                birthdate={userDetails.birthdate}
              />
            </div>
          </div>

          <div className="">
            <Address register={register} errors={errors} control={control} existing_address={userDetails.address} />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </>
  )
}

export default ProfileManagement






