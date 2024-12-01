import React from "react";
import { centralSupabase } from "../../supabaseClient";

const addStaffFiles = async (id, valid_id, gov_valid_id) => {
  // Function to upload a file to Supabase
  const uploadFile = async (file, filePath) => {
    try {
      const { data: staffFiles, error } = await centralSupabase.storage
        .from("Staff_Storage")
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

  const newValidID = `${id}/valid_id/${id}-valid_id.jpg`;
  const newGovValidID = `${id}/gov_valid_id/${id}-gov_valid_id.jpg`;

  try {
    if (valid_id) {
      await uploadFile(valid_id, newValidID);
    }

    if (gov_valid_id) {
      await uploadFile(gov_valid_id, newGovValidID);
    }
  } catch (error) {
    console.error("Error handling file uploads:", error.message);
  }
};

export default addStaffFiles;
