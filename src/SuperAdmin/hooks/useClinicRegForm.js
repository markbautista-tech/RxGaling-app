import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { clinicRegSchema } from "../schema/clinicRegSchema";
import { useQuery } from "@tanstack/react-query";
import { useFileSchema } from "../schema/fileShema";
import { addClinicDetails } from "../../utils/data/add/addClinicDetails";
import addClinicRequest from "../../utils/data/add/addClinicRequest";
import addFiles from "../../utils/data/add/addFiles";

const useClinicRegForm = () => {
  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const finalSubmit = () => {
    // console.log(dataSubmit);
    addClinicDetails(dataSubmit);
    // addFiles(dataSubmit.bir, dataSubmit.permit, dataSubmit.clinic_pic);
    // console.log(dataSubmit.permit[0].name);
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
  };
};

export default useClinicRegForm;
