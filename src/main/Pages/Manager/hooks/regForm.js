import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doctorSchedule } from "../schema";
import { useQuery } from "@tanstack/react-query";
import userDetails from "../../../../utils/data/userDetails";
import { centralSupabase } from "../../../../utils/supabaseClient";
import { addStaff } from "../../../../utils/data/add/addStaff";

export default function regForm() {
  const [age, setAge] = useState(null);

  const [dataSubmit, setDataSubmit] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchedule),
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

  // const { mutate } = useMutation({ mutationFn:  });

  const onConfirm = (data) => {
    setIsDialogOpen(true);
    setDataSubmit({...data})
    // const birthdate = data.month + "-" + data.day + "-" + data.year;
    // setDataSubmit({
    //   age: data.age,
    //   birthday: birthdate,
    //   contact_num: data.contact_num,
    //   email: data.email,
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
    //   specialty: data.specialty,
    //   license: data.license_num,
    //   ptr_num: data.ptr_num,
    //   s2_license_num: data.s2_license_num,
    // });
  };

  const onSubmit = () => {
    console.log(dataSubmit)
    // const addUser = addStaff(dataSubmit);

    // if (addUser.error) {
    //   console.log("error add user");
    // }
  };

  return {
    age,
    setAge,
    register,
    control,
    errors,
    handleSubmit,
    onConfirm,
    onSubmit,
    termsAccepted,
    setTermsAccepted,
    isDialogOpen,
    setIsDialogOpen,
  };
}
