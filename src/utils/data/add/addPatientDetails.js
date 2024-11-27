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
  const {
    region,
    province,
    city_muni,
    barangay,
    add_address,
    ...patientDetails
  } = patientdata;

  try {
    const { data: patientdetails, error: patineDetailsError } =
      await centralSupabase
        .from("PatientDetails")
        .insert([patientDetails])
        .select();

    if (patineDetailsError) {
      console.log("PatientDetails: Server Error ", patineDetailsError);
      return { error: patineDetailsError };
    }

    const patientAddress = {
      patient_id: patientdetails[0].id,
      region: await getRegionName(patientdata.region),
      province: await getProvinceName(patientdata.province),
      city_muni: await getCityMuniName(patientdata.city_muni),
      barangay: await getBarangayName(patientdata.barangay),
      add_address: patientdata.add_address,
    };

    const { data: patientAddressData, error: patientAddressError } =
      await centralSupabase
        .from("PatientAddress")
        .insert([patientAddress])
        .select();

    if (patientAddressError) {
      await centralSupabase
        .from("PatientDetails")
        .delete()
        .eq("id", patientdetails[0].id);
      console.log("PatientAddress: Server Error ", patientAddressError);
      return { error: patientAddressError };
    }

    // const patientIdData = {
    //   patient_id: patientdetails[0].id,
    //   id_number: patientdata.patientIDNum,
    // };

    // const { data: patientIDNum, error: patientIDNumError } =
    //   await centralSupabase
    //     .from("PatientIDNumber")
    //     .insert([patientIdData])
    //     .select();

    // if (patientIDNumError) {
    //   await centralSupabase
    //     .from("PatientDetails")
    //     .delete()
    //     .eq("id", patientdetails[0].id);

    //   await centralSupabase
    //     .from("PatientAddress")
    //     .delete()
    //     .eq("id", patientdetails[0].id);

    //   console.log("PatientIDNumber: Server Error ", patientIDNumError);
    //   return { error: patientIDNumError };
    // }

    return "success";
  } catch (error) {
    console.error(error);
  }
};

export default addPatientDetails;
