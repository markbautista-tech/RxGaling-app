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
import LoadingUI from "@/main/components/loadingUI";
import { FcOk } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const ClinicForm = () => {
  const navigate = useNavigate();
  // const [success, setSuccess] = useState(true);
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
    isSuccessDialog,
    setIsSuccessDialog,
    isFailedDialog,
    setIsFailedDialog,
    loading,
    setLoading,
    watch,
    setError,
    clearErrors,
  } = useClinicRegForm();

  return (
    <>
      <div>
        <div className="pt-10 lg:pt-16 no-scrollbar">
          <div className="p-3 lg:p-5">
            <ContentTitle title={"Clinic Registration"} />
          </div>
          <div>
            <div></div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border mx-5 lg:mx-10 lg:rounded-lg rounded-md shadow-md bg-secondary"
            >
              <div>
                <ClinicOwnerForm
                  watch={watch}
                  register={register}
                  errors={errors}
                  control={control}
                  setError={setError}
                  clearErrors={clearErrors}
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

                  <AlertDialog
                    open={isSuccessDialog}
                    onOpenChange={setIsSuccessDialog}
                  >
                    {!loading && (
                      <>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <div className="flex-center-all">
                              <FcOk className="w-20 h-20" />
                            </div>
                            <AlertDialogTitle className="text-center">
                              Submission Successful!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-center">
                              Your request was successfully submitted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex justify-center">
                            <AlertDialogAction
                              onClick={() => navigate(`/register-success`)}
                              className="lg:w-40"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </>
                    )}
                  </AlertDialog>

                  <AlertDialog
                    open={isFailedDialog}
                    onOpenChange={setIsFailedDialog}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <div className="flex-center-all">
                          <FcHighPriority className="w-20 h-20" />
                        </div>
                        <AlertDialogTitle className="text-center">
                          Submission Failed!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                          Your request was unabled to submit. Sorry for the
                          inconvenience.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-center">
                        <AlertDialogAction
                          onClick={() => setIsFailedDialog(false)}
                          className="lg:w-40"
                        >
                          Continue
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
