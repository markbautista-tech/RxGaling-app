import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClinicStaffSchema } from "../schema/ClinicStaff";
import { useQuery } from "@tanstack/react-query";
import userDetails from "../../../../utils/data/userDetails";
import { centralSupabase } from "../../../../utils/supabaseClient";
import { addStaff } from "../../../../utils/data/add/addStaff";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import getUserEmail from "@/utils/data/fetch/getUserDetails";

export default function staffRegForm() {
  const navigate = useNavigate();

  const [dataSubmit, setDataSubmit] = useState({});
  const [addressDataSubmit, setAddressDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [idDataSubmit, setIdDataSubmit] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ClinicStaffSchema),
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

  const getEmail = async (userId) => {
    const email = await getUserEmail(userId);

    return email ? email : null;
  };

  const onSubmit = (data) => {
    setIsDialogOpen(true);

    const {
      region,
      province,
      municipality,
      barangay,
      additional_address: address_line,
      ...rest
    } = data;

    setAddressDataSubmit({
      region,
      province,
      city: municipality,
      barangay,
      address_line,
    });

    const birthdate = data.month + "-" + data.day + "-" + data.year;
    setDataSubmit({
      first_name: rest.fname,
      last_name: rest.lname,
      middle_name: rest.mname,
      suffix: rest.extname,
      birthdate,
      mobile_number: rest.contact_num,
      gender: rest.gender,
    });

    setIdDataSubmit({
      valid_id: rest.picture,
      gov_valid_id: rest.gov_id_picture,
    });
  };

  const finalSubmit = (userId) => {
    setLoading(true);
    try {
      const addUser = addStaff(
        dataSubmit,
        addressDataSubmit,
        userId,
        idDataSubmit
      );
      if (addUser) {
        toast.success("Registered successfully");
        navigate("/sign-up");
      }
    } catch (error) {
      toast.error("Registration Error!");
    } finally {
      setLoading(false);
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
    watch,
    loading,
    getEmail,
  };
}
