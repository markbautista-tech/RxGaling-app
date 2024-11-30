import React from "react";
import { centralSupabase } from "../../supabaseClient";

const addFiles = async (name, bir, permit, clinic_pic) => {
  // Function to upload a file to Supabase
  const uploadFile = async (file, filePath) => {
    try {
      const { data: clinicFiles, error } = await centralSupabase.storage
        .from("Clinic_Storage")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      console.log(`${filePath} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${filePath}:`, error.message);
    }
  };

  const newBIR = `${name}/bir/${name}-bir.jpg`;
  const newPermit = `${name}/permit/${name}-permit.jpg`;
  const newPic = `${name}/clinic_pic/${name}-clinic_pic.jpg`;

  try {
    if (bir) {
      await uploadFile(bir, newBIR);
    }

    if (permit) {
      await uploadFile(permit, newPermit);
    }

    if (clinic_pic) {
      await uploadFile(clinic_pic, newPic);
    }
  } catch (error) {
    console.error("Error handling file uploads:", error.message);
  }
};

export default addFiles;
