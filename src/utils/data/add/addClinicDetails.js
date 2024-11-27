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
  try {
    const ownerAddress = {
      region: givenData.region,
      province: givenData.province,
      city: givenData.municipality,
      barangay: givenData.barangay,
      address_line: givenData.additional_address
    };

    const { data: address_data, error } = await centralSupabase
      .from("addresses")
      .insert([ownerAddress])
      .select();

    if (error) {
      console.log("Error inserting clinic address details", error);
    } else {
      console.log("Successfull inserting clinic address details");

        const birthdate = givenData.month + "-" + givenData.day + "-" + givenData.year;
        const clinicOwnerDetails = {
          address_id: address_data[0].id,
          first_name: givenData.fname,
          middle_name: givenData.mname,
          last_name: givenData.lname,
          suffix: givenData.extname,
          gender: givenData.gender,
          mobile_number: givenData.contact_num,
          email: givenData.email,
          birthdate
        };

        const { data: user_data, error } = await centralSupabase
          .from("users")
          .insert([clinicOwnerDetails])
          .select();

        const owner_id = user_data[0].id;
        
        if (error) {
          console.log("Error inserting clinic owner details", error);
        } else {
          console.log("Successfull inserting clinic owner details");

          const clinic = {
            name: givenData.clinic_name,
            owner_id,
            clinic_region: givenData.clinic_region,
            clinic_province: givenData.clinic_province,
            clinic_municipality: givenData.clinic_municipality,
            clinic_barangay: givenData.clinic_barangay,
            clinic_add_address: givenData.clinic_additional_address,
          };
      
          const clinic_id = await addClinic(clinic);

          if(clinic_id){
            console.log("Successfull inserting clinic details");

            const { clinic_staff_data, error } = await centralSupabase
              .from("clinic_staffs")
              .insert([{
                clinic_id,
                user_id: owner_id,
                role: "Owner"
              }]);

            if(error){
              console.log("Error inserting clinic staff details", error);
            }
            else{
              console.log("Successfull inserting clinic staff details");
            }
          }
          else{
            console.log("Error inserting clinic details", error); 
          }
      
          const request = {
            owner_id: user_data[0].id,
          };
      
          addClinicRequest(request);
      
          addFiles(
            user_data[0].uid,
            givenData.bir[0],
            givenData.permit[0],
            givenData.clinic_pic[0]
          );
      
          return clinic_id;
        }
    }
  } catch (error) {
    console.log("Error inserting all Clinic Details", error);
  }
};
