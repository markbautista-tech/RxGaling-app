import React, { useState } from "react";
import { clinicRegSchema } from "./clinicRegSchema";

export const useFileSchema = () => {
  const [fileData, setFileData] = useState({
    bir: null,
    permit: null,
    clinic_pic: null,
  });

  const handleBIRUpload = (event) => {
    const { name, files } = event.target;
    setFileData((prevData) => ({
      ...prevData,
      bir: files[0],
    }));

    // Set the file in the form using setValue
    setValue(name, files[0]);
  };

  const handlePermitUpload = (event) => {
    const { name, files } = event.target;
    setFileData((prevData) => ({
      ...prevData,
      permit: files[0],
    }));

    // Set the file in the form using setValue
    setValue(name, files[0]);
  };

  const handleClinicPicUpload = (event) => {
    const { name, files } = event.target;
    setFileData((prevData) => ({
      ...prevData,
      clinic_pic: files[0],
    }));

    // Set the file in the form using setValue
    setValue(name, files[0]);
  };

  return {
    fileData,
    handleBIRUpload,
    handlePermitUpload,
    handleClinicPicUpload,
  };
};
