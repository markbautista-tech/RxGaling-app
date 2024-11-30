import { Separator } from "@/components/ui/separator";
import ContentTitle from "@/main/PageContent/ContentTitle";
import ClinicDetailsForm from "@/SuperAdmin/components/ClinicDetailsForm";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import addNewClinic from "@/utils/data/add/addNewClinic";
import { useNavigate } from "react-router-dom";

const AddNewClinic = () => {
  const navigate = useNavigate();
  const clinicSchema = z.object({
    clinic_name: z.string().min(1, "Clinic Name is required."),
    clinic_region: z.string().min(1, { message: "Region is required" }),
    clinic_province: z.string().min(1, { message: "Province is required" }),
    clinic_municipality: z
      .string()
      .min(1, { message: "City/Municipality is required" }),
    clinic_barangay: z.string().min(1, { message: "Barangay is required" }),
    clinic_additional_address: z.string().optional(),

    permit: z.any().refine((file) => file && file.length > 0, {
      message: "File is required",
    }),
    bir: z.any().refine((file) => file && file.length > 0, {
      message: "File is required",
    }),
    clinic_pic: z.any().refine((file) => file && file.length > 0, {
      message: "File is required",
    }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clinicSchema),
  });

  const { ownerId, email, ownerName } = useUser();

  const [loading, setLoading] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [dataSubmit, setDataSubmit] = useState({});

  const onSubmit = (data) => {
    setShowAlert(true);
    setDataSubmit(data);
  };

  const finalSubmit = async () => {
    try {
      setLoading(true);

      const response = await addNewClinic(dataSubmit, ownerId);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="py-2 lg:py-4 flex justify-between items-center no-scrollbar">
          <ContentTitle title={"Register New Clinic"} />
        </div>
        <Separator orientation="horizontal" />
        <div>
          <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
            <div>
              <Label>Owner Name:</Label>
              <Input value={ownerName} readOnly />
            </div>
            <div>
              <Label>Email:</Label>
              <Input value={email} readOnly />
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ClinicDetailsForm
                register={register}
                errors={errors}
                control={control}
              />
              <div className="py-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
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

                <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewClinic;
