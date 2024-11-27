import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { pharmacyRegSchema } from "../schema/pharmacyRegSchema";
import { useForm } from "react-hook-form";

const usePharmacyReg = () => {
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
    console.log(dataSubmit);
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
    // isSuccessDialog,
    // setIsSuccessDialog,
    // isFailedDialog,
    // setIsFailedDialog,
    loading,
    // setLoading,
  };
};

export default usePharmacyReg;
