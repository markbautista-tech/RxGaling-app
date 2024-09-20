import { Route, Routes, Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import PageTemplate from "../main/modules/PageTemplate";
import UserRegistration from "../main/Pages/Forms/UserRegistration";
import DoctorRegistration from "../main/Pages/Forms/DoctorRegistration";
import NurseRegistration from "../main/Pages/Forms/NurseRegistration";
import RegistrationForm from "../main/Pages/Forms/RegistrationForm";

const MainRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/clinic-app/*" element={<PageTemplate />} />
        <Route path="/user-registration/*" element={<UserRegistration />} />
        <Route path="/doctor-registration/*" element={<RegistrationForm />} />
        <Route path="/nurse-registration/*" element={<NurseRegistration />} />
      </Routes>
    </>
  );
};

export default MainRouter;
