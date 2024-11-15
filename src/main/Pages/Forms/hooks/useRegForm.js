import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../schema/registrationSchema";
import { useQuery } from "@tanstack/react-query";
import userDetails from "../../../../utils/data/userDetails";
import { centralSupabase } from "../../../../utils/supabaseClient";
import addUserDetails from "../../../../utils/data/add/addUserDetails";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useRegForm() {
  const navigate = useNavigate();
  const [age, setAge] = useState(null);

  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    data: userDetail,
    isLoading,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ["userdetails"],
    queryFn: userDetails,
  });

  // const { mutate } = useMutation({ mutationFn:  });

  const onSubmit = (data) => {
    setIsDialogOpen(true);

    const birthdate = data.month + "-" + data.day + "-" + data.year;
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
      specialty: data.specialty,
      license: data.license_num,
      ptr_num: data.ptr_num,
      s2_license_num: data.s2_license_num,
      prof_extension: data.prof_extension,
      prc_no: data.prc_no,
    });
  };

  const finalSubmit = () => {
    setLoading(true);
    try {
      const addUser = addUserDetails(dataSubmit);

      if (addUser) {
        toast.success("Registered successfully");
        navigate("/user/sign-up");
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
