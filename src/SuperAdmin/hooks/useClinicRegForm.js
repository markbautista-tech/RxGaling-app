import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { clinicRegSchema } from "../schema/clinicRegSchema";
import { useQuery } from "@tanstack/react-query";
import { useFileSchema } from "../schema/fileShema";
import { addClinicDetails } from "../../utils/data/add/addClinicDetails";
import addClinicRequest from "../../utils/data/add/addClinicRequest";
import addFiles from "../../utils/data/add/addFiles";

import { useNavigate } from "react-router-dom";
import useFetchEmailApi from "./useFetchEmailApi";
import { toast } from "sonner";
import getRegNumber from "@/utils/data/fetch/getRegNumber";

const useClinicRegForm = () => {
  const navigate = useNavigate();
  const { sendAppreciation } = useFetchEmailApi();
  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [isFailedDialog, setIsFailedDialog] = useState(false);
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const { fileData } = useFileSchema();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clinicRegSchema),
  });

  // const {
  //   data: clinicDetail,
  //   isLoading,
  //   isFetched,
  //   isError,
  // } = useQuery({
  //   queryKey: ["clinicdetails"],
  //   queryFn: "",
  // });

  const onSubmit = (data) => {
    setIsDialogOpen(true);
    setDataSubmit(data);
    // console.log(data);
  };

  const finalSubmit = async () => {
    setLoading(true);
    setIsError(false);

    try {
      setIsError(false);
      const clinic_id = await addClinicDetails(dataSubmit);
      if (clinic_id) {
        navigate(`/register-success`);
        toast.success("Registered successfully");
        sendAppreciation(dataSubmit.email);
        return;
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setLoading(false);
      if (isError) {
        setIsFailedDialog(true);
        return;
      }

      setIsSuccessDialog(true);
    }
  };

  return {
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
    isSuccessDialog,
    setIsSuccessDialog,
    isFailedDialog,
    setIsFailedDialog,
    loading,
    setLoading,
    watch,
    setError,
    clearErrors,
  };
};

export default useClinicRegForm;
