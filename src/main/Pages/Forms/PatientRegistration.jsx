import React, { useEffect, useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Birthday from "./components/Birthday";
import SelectGender from "./components/Gender";
import Address from "./components/Address";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import usePatientReg from "./hooks/usePatientReg";
import NewBirthday from "./components/NewBirthday";
import NumberEmail from "./components/NumberEmail";
import NameComponent from "./components/Name";

const UserRegistration = () => {
  const {
    age,
    setAge,
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    finalSubmit,
    termsAccepted,
    setTermsAccepted,
    isDialogOpen,
    setIsDialogOpen,
    loading,
    watch,
  } = usePatientReg();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="" className="rounded-md border">
            Add Patient
            {/* <IoAddCircle className="w-8 h-8 cursor-pointer lg:w-10 lg:h-10" /> */}
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:w-[80%] pb-[100px] lg:pb-10 lg:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <NameComponent register={register} errors={errors} />
              <div>
                {/* <div>
                  <Label className="text-md">Birthday</Label>
                </div> */}
                <div className="lg:flex gap-3 lg:items-center">
                  <div className="flex-1 pb-3 lg:p-0">
                    <NewBirthday
                      register={register}
                      errors={errors}
                      control={control}
                      watch={watch}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <NumberEmail
                  register={register}
                  control={control}
                  errors={errors}
                />
                <div className="w-full">
                  <SelectGender
                    register={register}
                    control={control}
                    errors={errors}
                  />
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
            <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end py-5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  onCheckedChange={(checked) => setTermsAccepted(checked)}
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="border border-primary w-full lg:w-40"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full lg:w-40"
                disabled={!termsAccepted}
              >
                Register
              </Button>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {/* <AlertDialogTrigger asChild>
                  <Button
                    type="submit"

                    className="w-full lg:w-32"
                    disabled={!termsAccepted}
                  >
                    Register
                  </Button>
                </AlertDialogTrigger> */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm submission?</AlertDialogTitle>
                    <AlertDialogDescription className="flex gap-3">
                      {/* <HiMiniBellAlert className="w-10 h-10 text-primary" /> */}
                      This confirms that the following information are correct
                      and accepted the Terms and Condition.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={finalSubmit}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <DialogFooter></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserRegistration;
