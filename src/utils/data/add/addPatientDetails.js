import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";

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

const addPatientDetails = async (patientdata) => {
  const address = {
    region: patientdata.region,
    province: patientdata.province,
    city: patientdata.city_muni,
    barangay: patientdata.barangay,
    address_line: patientdata.add_address,
  };

  try {
    const { data: patientAddress, error: patientAddressError } =
      await centralSupabase.from("addresses").insert([address]).select();

    if (patientAddressError) {
      console.log("PatientAddress: Server Error ", patientAddressError);
      return { error: patientAddressError.message };
    }

    const patientDetails = {
      address_id: patientAddress[0].id,
      id_number: patientdata.id_number,
      first_name: patientdata.first_name,
      middle_name: patientdata.middle_name,
      last_name: patientdata.last_name,
      suffix: patientdata.ext_name,
      birthdate: patientdata.birthdate,
      age: patientdata.age,
      gender: patientdata.gender,
      email: patientdata.email,
      mobile_number: patientdata.contact_num,
    };

    const { data: patientData, error: patientDataError } = await centralSupabase
      .from("patients")
      .insert([patientDetails])
      .select();

    const addressid = patientData[0].address_id;

    if (patientDataError) {
      await centralSupabase.from("addresses").delete().eq("id", addressid);
      console.log("PatientDetails: Server Error ", patientDataError.message);

      return { error: patientDataError.message };
    }

    return "success";
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export default addPatientDetails;
