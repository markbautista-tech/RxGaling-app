import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import NameComponent from "../Name";
import Birthday from "../Birthday";
import SelectGender from "../Gender";
import NumberEmail from "../NumberEmail";
import Address from "../Address";
import Licenses from "../Licenses";
import Specialty from "../Specialty";
import OtherLicense from "../OtherLicense";
import useRegForm from "../../hooks/useRegForm";
import { ConfirmUserReg } from "../../../components/ConfirmDialog";
import { HiMiniBellAlert } from "react-icons/hi2";

const RegFormComponent = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
    finalSubmit,
    termsAccepted,
    setTermsAccepted,
    isDialogOpen,
    setIsDialogOpen,
  } = useRegForm();

  return (
    <>
      <Card>
        <CardHeader>
          {/* <CardTitle>Card Title</CardTitle> */}
          <CardDescription className="italic">
            Please fill up all important inputs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 lg:space-y-5">
              <NameComponent register={register} errors={errors} />
              <Birthday register={register} errors={errors} control={control} />
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <SelectGender errors={errors} control={control} />
                <NumberEmail register={register} errors={errors} />
              </div>
              <Address register={register} errors={errors} control={control} />
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <Licenses register={register} errors={errors} />
                <Specialty register={register} errors={errors} />
              </div>
              <div>
                <OtherLicense register={register} errors={errors} />
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
              <Button
                type="submit"
                className="w-full lg:w-32"
                disabled={!termsAccepted}
              >
                Register
              </Button>
              {/* <ConfirmUserReg /> */}

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
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default RegFormComponent;
