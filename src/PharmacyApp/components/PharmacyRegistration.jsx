import ContentTitle from "@/main/PageContent/ContentTitle";
import NameComponent from "@/main/Pages/Forms/components/Name";
import React from "react";
import usePharmacyReg from "../hooks/usePharmacyReg";
import SelectGender from "@/main/Pages/Forms/components/Gender";
import NumberEmail from "@/main/Pages/Forms/components/NumberEmail";
import Address from "@/main/Pages/Forms/components/Address";
import NewBirthday from "@/main/Pages/Forms/components/NewBirthday";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PharmacyAddress from "./PharmacyAddress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const PharmacyRegistration = () => {
  const {
    register,
    errors,
    control,
    watch,
    termsAccepted,
    setTermsAccepted,
    loading,
    handleSubmit,
    onSubmit,
    finalSubmit,
    isDialogOpen,
    setIsDialogOpen,
  } = usePharmacyReg();
  return (
    <>
      <div>
        <div className="pt-10 lg:pt-16 no-scrollbar">
          <div className="p-3 lg:p-5">
            <ContentTitle title={"Pharmacy Registration"} />
          </div>
          <div className="border mx-5 lg:mx-10 lg:rounded-lg rounded-md shadow-md bg-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-5 lg:px-20">
                <div className="pb-3">
                  <p className="font-bold text-md lg:text-xl">
                    PHARMACY OWNER DETAILS
                  </p>
                </div>
                <div className="space-y-3 lg:space-y-5">
                  <NameComponent register={register} errors={errors} />
                  <NewBirthday
                    register={register}
                    errors={errors}
                    control={control}
                    watch={watch}
                  />
                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <SelectGender errors={errors} control={control} />
                    <NumberEmail register={register} errors={errors} />
                  </div>

                  <Address
                    register={register}
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className="py-5 px-3 lg:px-8">
                  <Separator orientation="horizontal" className="" />
                </div>
                <div className="pb-3">
                  <p className="font-bold text-md lg:text-xl">
                    PHARMACY DETAILS
                  </p>
                </div>
                <div className="space-y-3 lg:space-y-5">
                  <div>
                    <Label>Pharmacy Name</Label>
                    <Input {...register("pharmacy_name")} type="text" />
                    {errors.pharmacy_name && (
                      <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                        {errors.pharmacy_name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3 lg:space-y-5">
                    <div>
                      <PharmacyAddress
                        register={register}
                        errors={errors}
                        control={control}
                      />
                    </div>
                    <div>
                      <Label>Pharmacy FDA License Number</Label>
                      <Input type="text" {...register("fda_number")} />
                      {errors.fda_number && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.fda_number.message}
                        </p>
                      )}
                    </div>
                    <p className="italic text-sm lg:text-md">
                      Please upload pictures (.JPEG) for the following:
                    </p>
                    <div>
                      <Label>Pharmacy FDA License</Label>
                      <Input type="file" {...register("fda_license")} />
                      {errors.fda_license && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.fda_license.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Pharmacy Picture</Label>
                      <Input type="file" {...register("pharmacy_pic")} />
                      {errors.pharmacy_pic && (
                        <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                          {errors.pharmacy_pic.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5 lg:px-20">
                  <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end py-5 ">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        onCheckedChange={(checked) => setTermsAccepted(checked)}
                      />
                      <Label className="lg:text-md">
                        Accept{" "}
                        <span className="text-primary hover:underline hover:text-gray-800 cursor-pointer font-bold">
                          Terms and Conditions
                        </span>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      disabled={!termsAccepted || loading}
                      className="w-full lg:w-48 lg:text-lg font-semibold"
                    >
                      {loading ? (
                        <>
                          <span className="mr-2 h-4 w-4 inline-block border-2 border-t-2 border-gray-200 border-t-purple-950 rounded-full animate-spin"></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
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
                          <AlertDialogTitle>
                            Confirm submission?
                          </AlertDialogTitle>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyRegistration;
