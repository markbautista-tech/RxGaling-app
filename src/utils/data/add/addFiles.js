import React from "react";
import { centralSupabase } from "../../supabaseClient";
import { useFileSchema } from "../../../SuperAdmin/schema/fileShema";

const addFiles = async (uid, bir, permit, clinic_pic) => {
  const { handleBIRUpload, handlePermitUpload, handleClinicPicUpload } =
    useFileSchema();

  // Function to upload a file to Supabase
  const uploadFile = async (file, filePath) => {
    try {
      const { data, error } = await centralSupabase.storage
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

  const newBIR = `${uid}/bir/${uid}-bir.jpg`;
  const newPermit = `${uid}/permit/${uid}-permit.jpg`;
  const newPic = `${uid}/clinic_pic/${uid}-clinic_pic.jpg`;

  try {
    // if (bir) {
    //   await uploadFile(bir, `${uid}/bir/${bir[0].name}`);
    // }

    // if (permit) {
    //   await uploadFile(permit, `${uid}/permit/${permit[0].name}`);
    // }

    // if (clinic_pic) {
    //   await uploadFile(clinic_pic, `${uid}/clinic_pic/${clinic_pic[0].name}`);
    // }

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
