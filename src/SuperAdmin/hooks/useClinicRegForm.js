import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { clinicRegSchema } from "../schema/clinicRegSchema";
import { useQuery } from "@tanstack/react-query";
import { useFileSchema } from "../schema/fileShema";

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
  //   data: userDetail,
  //   isLoading,
  //   isFetched,
  //   isError,
  // } = useQuery({
  //   queryKey: ["userdetails"],
  //   queryFn: userDetails,
  // });

  const onSubmit = (data) => {
    const combinedData = {
      ...data,
      ...fileData, // Combine form data with the uploaded files
    };

    try {
      clinicRegSchema.parse(combinedData); // Validate using zod schema
      setIsDialogOpen(true); // Open the dialog after validation
      setDataSubmit(combinedData); // Store the validated data for further use
    } catch (error) {
      console.error("Validation failed:", error.errors);
    }
  };

  const finalSubmit = () => {};

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
