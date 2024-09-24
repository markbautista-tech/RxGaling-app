import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import PageHeader from "../../main/PageHeader";
import ContentTitle from "../../main/PageContent/ContentTitle";
import useClinicRegForm from "../hooks/useClinicRegForm";
import ClinicOwnerForm from "./ClinicOwnerForm";
import ClinicDetailsForm from "./ClinicDetailsForm";

const ClinicForm = () => {
  const {
    termsAccepted,
    setTermsAccepted,
    setStep,
    step,
    register,
    errors,
    handleSubmit,
    onSubmit,
    control,
    handleNext,
    handlePrev,
  } = useClinicRegForm();

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
              {/* {step == 1 && (
                <ClinicOwnerForm
                  register={register}
                  errors={errors}
                  control={control}
                />
              )}
              {step == 2 && (
                <ClinicDetailsForm
                  register={register}
                  errors={errors}
                  control={control}
                />
              )} */}
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
                  {/* {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      className="w-full lg:w-32"
                    >
                      Previous
                    </Button>
                  )}

                  {step < 2 && (
                    <Button
                      type="button"
                      onClick={handlePrev}
                      className="w-full lg:w-32"
                    >
                      Next
                    </Button>
                  )}

                  {step === 2 && (
                    <Button type="submit" className="w-full lg:w-32">
                      Submit
                    </Button>
                  )} */}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="flex items-center space-x-2">
                <Checkbox
                id="terms"
                onCheckedChange={(checked) => setTermsAccepted(checked)}
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
                </div> */}
      </div>
    </>
  );
};

export default ClinicForm;
