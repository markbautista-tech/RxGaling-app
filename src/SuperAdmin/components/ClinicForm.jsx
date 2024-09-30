import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
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
import PageHeader from "../../main/PageHeader";
import ContentTitle from "../../main/PageContent/ContentTitle";
import useClinicRegForm from "../hooks/useClinicRegForm";
import ClinicOwnerForm from "./ClinicOwnerForm";
import ClinicDetailsForm from "./ClinicDetailsForm";

const ClinicForm = () => {
  const {
    termsAccepted,
    setTermsAccepted,
    register,
    errors,
    handleSubmit,
    onSubmit,
    control,
    finalSubmit,
    isDialogOpen,
    setIsDialogOpen,
  } = useClinicRegForm();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <div>
        <div className="fixed left-0 top-0 w-full">
          <PageHeader />
        </div>
        <div className="pt-10 lg:pt-16 no-scrollbar">
          <div className="p-3 lg:p-5">
            <ContentTitle title={"Clinic Registration"} />
          </div>
          <div>
            <div></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <ClinicOwnerForm
                  register={register}
                  errors={errors}
                  control={control}
                />
              </div>
              <div className="py-5 px-3 lg:px-8">
                <Separator orientation="horizontal" className="" />
              </div>

              <ClinicDetailsForm
                register={register}
                errors={errors}
                control={control}
              />

              <div className="p-5 lg:px-20">
                <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end py-5 ">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(checked) => setTermsAccepted(checked)}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <Button
                    type="submit"
                    disabled={!termsAccepted}
                    className="w-full lg:w-32"
                  >
                    Submit
                  </Button>

                  <AlertDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                  >
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
                          This confirms that the following information are
                          correct and accepted the Terms and Condition.
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicForm;
