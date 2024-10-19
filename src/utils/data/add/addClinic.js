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
  const clinicDetails = {
    name: givenData.name,
    owner_id: givenData.owner_id,
    status: "Unverified",
  };

  try {
    const { data, error } = await centralSupabase
      .from("ClinicDetails")
      .insert([clinicDetails])
      .select();

    if (error) {
      console.log("Error inserting clinic details", error);
    } else {
      console.log("Successful add clinic details");
    }

    const clinicAddress = {
      clinic_id: data[0].id,
      region: await getRegionName(givenData.clinic_region),
      province: await getProvinceName(givenData.clinic_province),
      city_muni: await getCityMuniName(givenData.clinic_municipality),
      barangay: await getBarangayName(givenData.clinic_barangay),
      add_address: givenData.clinic_add_address,
    };

    await addClinicAddress(clinicAddress);

    return data[0].id;
  } catch (error) {
    console.log("Catch error add clinic details", error);
  }
};
