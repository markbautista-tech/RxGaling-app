import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { clinicRegSchema } from "../schema/clinicRegSchema";
import { useQuery } from "@tanstack/react-query";

const useClinicRegForm = () => {
  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [step, setStep] = useState(1);
  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

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
    // handleNext();

    // // setIsDialogOpen(true);
    // setDataSubmit({
    //   ext_name: data.extname,
    //   first_name: data.fname,
    //   gender: data.gender,
    //   last_name: data.lname,
    //   middle_name: data.mname,
    //   region: data.region,
    //   province: data.province,
    //   city_muni: data.municipality,
    //   barangay: data.barangay,
    //   add_address: data.additional_address,
    // });

    console.log("data clinic owner");
  };

  const finalSubmit = () => {
    console.log("submitted!");
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
    step,
    setStep,
    handleNext,
    handlePrev,
  };
};

export default useClinicRegForm;
