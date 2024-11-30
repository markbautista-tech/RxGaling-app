import React from "react";
import { centralSupabase } from "../../supabaseClient";
import addClinicAddress from "./addClinicAddress";
import addFiles from "./addFiles";
import {
  getClinicBIR,
  getClinicPermit,
  getClinicPic,
} from "../fetch/getClinicFiles";

export const addClinic = async (givenData, userId) => {
  try {
    const clinicAddress = {
      region: givenData.clinic_region,
      province: givenData.clinic_province,
      city: givenData.clinic_municipality,
      barangay: givenData.clinic_barangay,
      address_line: givenData.clinic_add_address,
    };

    const { data: clinic_address_data, clinic_address_error } =
      await centralSupabase.from("addresses").insert([clinicAddress]).select();

    if (clinic_address_error) {
      console.log("Error inserting clinic address", clinic_address_error);
    } else {
      console.log("Successfull add clinic address.");

      await addFiles(
        userId,
        givenData.bir[0],
        givenData.permit[0],
        givenData.clinic_pic[0]
      );

      const birUrl = getClinicBIR(userId);
      const permitUrl = getClinicPermit(userId);
      const clinicPicUrl = getClinicPic(userId);

      const clinicDetails = {
        name: givenData.name,
        owner_id: givenData.owner_id,
        address_id: clinic_address_data[0].id,
        mayor_permit_url: permitUrl.publicUrl,
        bir_url: birUrl.publicUrl,
        site_pic_url: clinicPicUrl.publicUrl,
      };

      const { data, error } = await centralSupabase
        .from("clinics")
        .insert([clinicDetails])
        .select();

      if (error) {
        console.log("Error inserting clinic details", error);
      } else {
        console.log("Successful add clinic details");

        return data[0].id;
      }
    }
  } catch (error) {
    console.log("Catch error add clinic details", error);
  }
};
