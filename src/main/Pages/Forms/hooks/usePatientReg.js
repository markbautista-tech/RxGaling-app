import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { patientSchema } from "../schema/patientReg";
import addPatientDetails from "@/utils/data/add/addPatientDetails";

export default function usePatientReg() {
  const [age, setAge] = useState(null);

  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentNum, setCurrentNum] = useState(1001);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(patientSchema),
  });

  const generateSequentialId = () => {
    const year = new Date().getFullYear(); // Get current year
    const newId = `${year}-${currentNum}`; // Format: "2024-1001"
    setCurrentNum(currentNum + 1); // Increment for the next ID
    return newId;
  };

  const onSubmit = async (data) => {
    console.log(data);
    setIsDialogOpen(true);

    const birthdate = data.month + "-" + data.day + "-" + data.year;
    const patientIDNum = generateSequentialId();
    setDataSubmit({
      age: data.age,
      birthday: birthdate,
      contact_num: data.contact_num,
      email: data.email,
      ext_name: data.extname,
      first_name: data.fname,
      gender: data.gender,
      last_name: data.lname,
      middle_name: data.mname,
      region: data.region,
      province: data.province,
      city_muni: data.municipality,
      barangay: data.barangay,
      add_address: data.additional_address,
      patientIDNum: patientIDNum,
    });
  };

  const finalSubmit = async () => {
    setLoading(true);
    try {
      const response = await addPatientDetails(dataSubmit);

      if (response) {
        toast.success("Patient registered successfully");
      }
    } catch (error) {
      toast.error("Registration Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    age,
    setAge,
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
    loading,
    watch,
  };
}
