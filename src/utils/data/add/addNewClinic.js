import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";
import addFiles from "./addFiles";
import {
  getClinicBIR,
  getClinicPermit,
  getClinicPic,
} from "../fetch/getClinicFiles";

const addNewClinic = async (givenData, ownerId) => {
  const address = {
    region: givenData.clinic_region,
    province: givenData.clinic_province,
    city: givenData.clinic_municipality,
    barangay: givenData.clinic_barangay,
    address_line: givenData.clinic_additional_address,
  };
  try {
    const { data: newClinicAddress, error: newClinicAddressError } =
      await centralSupabase.from("addresses").insert([address]).select();

    if (newClinicAddressError) {
      return { error: newClinicAddressError.message };
    } else {
      await addFiles(
        givenData.clinic_name,
        givenData.bir[0],
        givenData.permit[0],
        givenData.clinic_pic[0]
      );

      const birUrl = getClinicBIR(givenData.clinic_name);
      const permitUrl = getClinicPermit(givenData.clinic_name);
      const clinicPicUrl = getClinicPic(givenData.clinic_name);

      const clinicData = {
        owner_id: ownerId,
        address_id: newClinicAddress[0].id,
        name: givenData.clinic_name,
        mayor_permit_url: permitUrl.publicUrl,
        bir_url: birUrl.publicUrl,
        site_pic_url: clinicPicUrl.publicUrl,
      };

      const { data: newClinicDetails, error: newClinicDetailsError } =
        await centralSupabase.from("clinics").insert([clinicData]).select();

      if (newClinicDetailsError) {
        return { error: newClinicDetailsError.message };
      }

      return {
        success:
          "Successfully registered new clinic. Please wait 1-2 working days for verification.",
      };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export default addNewClinic;
