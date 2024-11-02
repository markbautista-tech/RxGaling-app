import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { clinicRegSchema } from "../schema/clinicRegSchema";
import { useQuery } from "@tanstack/react-query";
import { useFileSchema } from "../schema/fileShema";
import { addClinicDetails } from "../../utils/data/add/addClinicDetails";
import addClinicRequest from "../../utils/data/add/addClinicRequest";
import addFiles from "../../utils/data/add/addFiles";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useClinicRegForm = () => {
  const navigate = useNavigate();
  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [isFailedDialog, setIsFailedDialog] = useState(false);
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { fileData } = useFileSchema();

  const {
    register,
    handleSubmit,
    control,
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
  };

  const finalSubmit = async () => {
    setLoading(true);
    try {
      setIsError(false);
      const id = await addClinicDetails(dataSubmit);
      if (id) {
        navigate(`/register-success/${id[0].registration_number}`);
      }
      console.log(id);
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
  };
};

export default useClinicRegForm;
