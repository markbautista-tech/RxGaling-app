import { centralSupabase } from "@/utils/supabaseClient";
import React from "react";
import { useNavigate } from "react-router-dom";

export const declineRequest = async (ownerId) => {
  try {
    const { data, error } = await centralSupabase
      .from("clinics")
      .update({ status: "Declined" })
      .eq("owner_id", ownerId);

    if (error) {
      return error;
    }

    return "success";
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (ownerId) => {
  const acceptedDate = new Date();

  const createLicense = () => {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${randomNumber}-${currentDate}${ownerId}`;
  };

  try {
    const { data: existingLicense, error: licenseError } = await centralSupabase
      .from("clinics")
      .select("license_num")
      .eq("owner_id", ownerId);

    if (licenseError) {
      return licenseError;
    }

    // If a license already exists for this owner, avoid duplication
    if (existingLicense.length > 0 && existingLicense[0].license_num) {
      return "License already exists for this owner.";
    }

    // Generate and verify a unique license number
    let newLicense;
    let isUnique = false;

    while (!isUnique) {
      newLicense = createLicense();

      const { data: duplicateCheck, error: checkError } = await centralSupabase
        .from("clinics")
        .select("license_num")
        .eq("license_num", newLicense);

      if (checkError) {
        return checkError;
      }

      // If no duplicate found, set the flag to true
      if (duplicateCheck.length === 0) {
        isUnique = true;
      }
    }

    // Update the database with the unique license number
    const { data, error } = await centralSupabase
      .from("clinics")
      .update({
        status: "Verified",
        accepted_at: acceptedDate,
        license_num: newLicense,
      })
      .eq("owner_id", ownerId);

    if (error) {
      return error;
    }

    return "success";
  } catch (error) {
    console.log(error);
    return "An error occurred.";
  }
};

export const archive = async (ownerId) => {
  try {
    const { data, error } = await centralSupabase
      .from("clinics")
      .update({ status: "Archived" })
      .eq("owner_id", ownerId);

    if (error) {
      return error;
    }

    return "Archived";
  } catch (error) {
    console.log(error);
  }
};

export const declinePharmacyRequest = async (id) => {
  try {
    const { data, error } = await centralSupabase
      .from("pharmacy")
      .update({ status: "Declined", updated_at: new Date() })
      .eq("id", id);

    if (error) {
      return error;
    }

    return "success";
  } catch (error) {
    console.log(error);
  }
};

export const acceptPharmacyRequest = async (id) => {
  const acceptedDate = new Date();

  const createLicense = () => {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${randomNumber}-${currentDate}${id}`;
  };

  try {
    const { data: existingLicense, error: licenseError } = await centralSupabase
      .from("pharmacy")
      .select("license_num")
      .eq("id", id);

    if (licenseError) {
      return licenseError;
    }

    // If a license already exists for this owner, avoid duplication
    if (existingLicense.length > 0 && existingLicense[0].license_num) {
      return "License already exists for this owner.";
    }

    // Generate and verify a unique license number
    let newLicense;
    let isUnique = false;

    while (!isUnique) {
      newLicense = createLicense();

      const { data: duplicateCheck, error: checkError } = await centralSupabase
        .from("pharmacy")
        .select("license_num")
        .eq("license_num", newLicense);

      if (checkError) {
        return checkError;
      }

      // If no duplicate found, set the flag to true
      if (duplicateCheck.length === 0) {
        isUnique = true;
      }
    }

    // Update the database with the unique license number
    const { data, error } = await centralSupabase
      .from("pharmacy")
      .update({
        status: "Accepted",
        accepted_at: acceptedDate,
        license_num: newLicense,
      })
      .eq("id", id);

    if (error) {
      return error;
    }

    return "success";
  } catch (error) {
    console.log(error);
    return "An error occurred.";
  }
};
