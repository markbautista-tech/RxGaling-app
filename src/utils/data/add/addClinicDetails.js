import React, { useState } from "react";
import { centralSupabase } from "../../supabaseClient";
import { addClinicOwnerAddress } from "./addClinicOwnerAddress";
import { addClinic } from "./addClinic";
import addClinicRequest from "./addClinicRequest";
import { v4 as uuidv4 } from "uuid";
import addFiles from "./addFiles";
import getRegNumber from "../fetch/getRegNumber";
import useClinicDetails from "@/SuperAdmin/hooks/useClinicDetails";

const getRegionName = async (regionId) => {
  try {
    const response = await fetch(`https://psgc.cloud/api/regions/${regionId}`);
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProvinceName = async (provinceId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCityMuniName = async (cityMuniId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBarangayName = async (barangayId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const addClinicDetails = async (givenData) => {
  const clinicOwnerDetails = {
    first_name: givenData.fname,
    middle_name: givenData.mname,
    last_name: givenData.lname,
    ext_name: givenData.extname,
    gender: givenData.gender,
    contact_num: givenData.contact_num,
    email: givenData.email,
    uid: uuidv4(),
  };

  try {
    const { data, error } = await centralSupabase
      .from("ClinicOwnerDetails")
      .insert([clinicOwnerDetails])
      .select();

    const ownerAddress = {
      owner_id: data[0].id,
      region: await getRegionName(givenData.region),
      province: await getProvinceName(givenData.province),
      city_muni: await getCityMuniName(givenData.municipality),
      barangay: await getBarangayName(givenData.barangay),
      add_address: givenData.additional_address,
    };

    if (error) {
      console.log("Error inserting clinic owner details", error);
    } else {
      console.log("Successfull inserting clinic owner details");

      try {
        const { data, error } = await centralSupabase
          .from("ClinicOwnerAddress")
          .insert([ownerAddress])
          .select();

        if (error) {
          console.log("Error inserting clinic owner address", error);
        } else {
          console.log("Successfull inserting clinic owner address");
        }
      } catch (error) {
        console.log("catch error owner address", error);
      }
    }

    const clinic = {
      name: givenData.clinic_name,
      owner_id: data[0].id,
      // status: "Unverified",
      clinic_region: givenData.clinic_region,
      clinic_province: givenData.clinic_province,
      clinic_municipality: givenData.clinic_municipality,
      clinic_barangay: givenData.clinic_barangay,
      clinic_add_address: givenData.clinic_additional_address,
    };

    addClinic(clinic);

    const request = {
      owner_id: data[0].id,
    };

    addClinicRequest(request);

    addFiles(
      data[0].uid,
      givenData.bir[0],
      givenData.permit[0],
      givenData.clinic_pic[0]
    );

    return data[0].id;
  } catch (error) {
    console.log("Error inserting all Clinic Details", error);
  }
};
