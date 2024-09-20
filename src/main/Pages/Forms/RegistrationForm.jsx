import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import RegFormComponent from "./components/RegForm";

const RegistrationForm = () => {
  return (
    <>
      <div className="p-5 lg:p-10">
        <RegFormComponent />
      </div>
    </>
  );
};

export default RegistrationForm;
