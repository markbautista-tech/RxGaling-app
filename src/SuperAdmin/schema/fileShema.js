import React, { useState } from "react";

export const useFileSchema = () => {
  const handleBIRUpload = (event) => {
    const bir = event.target.files[0];
    return bir;
  };

  const handlePermitUpload = (event) => {
    const permit = event.target.files[0];
    return permit;
  };

  const handleClinicPicUpload = (event) => {
    const clinic_pic = event.target.files[0];
    return clinic_pic;
  };

  return {
    handleBIRUpload,
    handlePermitUpload,
    handleClinicPicUpload,
  };
};
