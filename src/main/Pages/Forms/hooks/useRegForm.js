import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationSchema } from "../schema/registrationSchema";
import { useQuery } from "@tanstack/react-query";
import userDetails from "../../../../utils/data/userDetails";
import { centralSupabase } from "../../../../utils/supabaseClient";
import addUserDetails from "../../../../utils/data/add/addUserDetails";

export default function useRegForm() {
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
    });
    // const dataToSubmit = {
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
    // };

    // additional_address: "Deserunt consectetur";
    // age: "24";
    // barangay: "1401108011";
    // contact_num: "30546546598";
    // day: "4";
    // email: "dizil@mailinator.com";
    // extname: "Willow Gamble";
    // fname: "Petra Robertson";
    // gender: "Female";
    // license_num: "Inventore maiores al";
    // lname: "Hollee Klein";
    // mname: "Bryar Kemp";
    // month: "11";
    // municipality: "1401108000";
    // province: "1401100000";
    // ptr_num: "Quae provident eius";
    // region: "1400000000";
    // s2_license_num: "Voluptate voluptas u";
    // specialty: "Tempore numquam off";
    // year: "2000";

    // const addUser = addUserDetails(dataToSubmit);

    // if (addUser.error) {
    //   console.log("error add user");
    // }

    // console.log(birthdate);
  };

  const finalSubmit = () => {
    const addUser = addUserDetails(dataSubmit);

    if (addUser.error) {
      console.log("error add user");
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
  };
}
