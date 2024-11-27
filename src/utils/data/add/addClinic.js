import React from "react";
import { centralSupabase } from "../../supabaseClient";
import addClinicAddress from "./addClinicAddress";

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

export const addClinic = async (givenData) => {
  try {

    const clinicAddress = {
      region: givenData.clinic_region,
      province: givenData.clinic_province,
      city: givenData.clinic_municipality,
      barangay: givenData.clinic_barangay,
      address_line: givenData.clinic_add_address,
    };

    const { data: clinic_address_data, clinic_address_error } = await centralSupabase
      .from("addresses")
      .insert([clinicAddress])
      .select();

    if (clinic_address_error) {
      console.log("Error inserting clinic address", clinic_address_error);
    } else {
      console.log("Successfull add clinic address.");

      const clinicDetails = {
        name: givenData.name,
        owner_id: givenData.owner_id,
        address_id: clinic_address_data[0].id,
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
