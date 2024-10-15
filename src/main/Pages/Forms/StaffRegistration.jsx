import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import StaffRegFormComponent from "./components/Staff";

const StaffRegistration = () => {
  return (
    <>
      <div className="p-5 lg:p-10">
        <StaffRegFormComponent />
      </div>
    </>
  );
};

export default StaffRegistration;
