import React from "react";
import { centralSupabase } from "../../supabaseClient";

const addPharmacyFiles = async (name, fda, pic) => {
  // Function to upload a file to Supabase
  const uploadFile = async (file, filePath) => {
    try {
      const { data: clinicFiles, error } = await centralSupabase.storage
        .from("Pharmacy_Storage")
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

  const newFDA = `${name}/fda/${name}-fda.jpg`;
  const newPic = `${name}/pic/${name}-pic.jpg`;

  try {
    if (fda) {
      await uploadFile(fda, newFDA);
    }

    if (pic) {
      await uploadFile(pic, newPic);
    }
  } catch (error) {
    console.error("Error handling file uploads:", error.message);
  }
};

export default addPharmacyFiles;
