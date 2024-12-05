import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { pharmacyRegSchema } from "../schema/pharmacyRegSchema";
import { useForm } from "react-hook-form";
import addPharmacyOwner from "@/utils/data/add/addPharmacyOwner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useFetchEmailApi from "@/SuperAdmin/hooks/useFetchEmailApi";

const usePharmacyReg = () => {
  const navigate = useNavigate();
  const { sendPharmacyAppreciation } = useFetchEmailApi();
  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [isFailedDialog, setIsFailedDialog] = useState(false);
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pharmacyRegSchema),
  });

  const onSubmit = async (data) => {
    setIsDialogOpen(true);
    setDataSubmit(data);
  };

  const finalSubmit = async () => {
    setLoading(true);
    const birthdate =
      dataSubmit.month + "-" + dataSubmit.day + "-" + dataSubmit.year;
    try {
      const response = await addPharmacyOwner(dataSubmit, birthdate);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Registered Successfully");
        navigate("/register-pharmacy-success");
        sendPharmacyAppreciation(dataSubmit.email);
      }
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  return {
    register,
    control,
    errors,
    watch,
    handleSubmit,
    onSubmit,
    finalSubmit,
    termsAccepted,
    setTermsAccepted,
    isDialogOpen,
    setIsDialogOpen,
    loading,
    setError,
    clearErrors,
  };
};

export default usePharmacyReg;
