import React, { useEffect, useState } from "react";

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
import NewBirthday from "../NewBirthday";
import { useParams } from "react-router-dom";
import { IdCard } from "lucide-react";

const RegFormComponent = () => {
  const { id } = useParams();

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
    loading,
    watch,
    getEmail,
  } = useRegForm();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      const user_email = await getEmail(id);
      setUserEmail(user_email?.email);
    };

    fetchEmail();
  }, [id]);

  return (
    <>
      <Card className="lg:px-10 bg-gray-200">
        <CardHeader>
          <CardTitle>Doctor Registration</CardTitle>
          <CardDescription className="italic">
            Please fill up all important inputs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 lg:space-y-5">
              <NameComponent register={register} errors={errors} />
              {/* <Birthday register={register} errors={errors} control={control} /> */}
              <NewBirthday
                register={register}
                errors={errors}
                control={control}
                watch={watch}
              />

              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <SelectGender
                  register={register}
                  errors={errors}
                  control={control}
                />
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
                    value={userEmail}
                  />
                  {errors.email && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* <NumberEmail register={register} errors={errors} /> */}
              </div>
              <Address register={register} errors={errors} control={control} />
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <Licenses register={register} errors={errors} />
                <Specialty
                  register={register}
                  errors={errors}
                  control={control}
                />
              </div>
              <div>
                <OtherLicense register={register} errors={errors} />
              </div>
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div>
                  <Label>PRC License Number</Label>
                  <Input {...register("prc_no")} type="text" placeholder="" />
                  {errors.prc_no && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.prc_no.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Professional Extension</Label>
                  <Input
                    {...register("prof_extension")}
                    type="text"
                    placeholder=""
                  />
                  {errors.prof_extension && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.prof_extension.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end py-5">
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
                    <AlertDialogAction onClick={() => finalSubmit(id)}>
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
