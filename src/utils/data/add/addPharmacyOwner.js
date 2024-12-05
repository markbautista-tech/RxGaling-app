import React from "react";
import { centralSupabase } from "@/utils/supabaseClient";
import addPharmacy from "./addPharmacy";

const addPharmacyOwner = async (givendata, birthdate) => {
  const phar_owner_address = {
    address_line: givendata.additional_address,
    region: givendata.region,
    province: givendata.province,
    city: givendata.municipality,
    barangay: givendata.barangay,
  };

  try {
    const { data: ownerAddress, error: ownerAddressError } =
      await centralSupabase
        .from("addresses")
        .insert([phar_owner_address])
        .select();

    if (ownerAddressError) {
      return { error: ownerAddressError.message };
    }

    const owner_data = {
      address_id: ownerAddress[0].id,
      first_name: givendata.fname,
      middle_name: givendata.mname,
      last_name: givendata.lname,
      suffix: givendata.extname,
      birthdate,
      gender: givendata.gender,
      mobile_number: givendata.contact_num,
      email: givendata.email,
    };

    const { data: owner, error: ownerError } = await centralSupabase
      .from("users")
      .insert([owner_data])
      .select();

    if (ownerError) {
      const { error } = await centralSupabase
        .from("addresses")
        .delete()
        .eq("id", owner[0].address_id);

      return { error: ownerError.message };
    }

    const pharmacy_id = await addPharmacy(givendata, owner[0].id);

    if (pharmacy_id) {
      console.log("Successfull inserting clpharmacyinic details");

      const { error } = await centralSupabase.from("pharmacy_staffs").insert([
        {
          pharmacy_id,
          owner_id: owner[0].id,
          role: "Owner",
        },
      ]);

      if (error) {
        console.log("Error inserting pharmacy staff details", error);
      } else {
        console.log("Successfull inserting pharmacy staff details");
      }
    } else {
      console.log("Error inserting pharmacy details", error);
    }

    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

export default addPharmacyOwner;
