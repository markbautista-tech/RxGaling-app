import { Route, Routes, Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import PageTemplate from "../main/modules/PageTemplate";
import UserRegistration from "../main/Pages/Forms/UserRegistration";
import DoctorRegistration from "../main/Pages/Forms/DoctorRegistration";
import NurseRegistration from "../main/Pages/Forms/NurseRegistration";
import RegistrationForm from "../main/Pages/Forms/RegistrationForm";
import SuperAdmin from "../SuperAdmin";
import ClinicOwnerForm from "../SuperAdmin/components/ClinicOwnerForm";
import ClinicForm from "../SuperAdmin/components/ClinicForm";
import LoginForm2 from "../main/components/loginForm2";
import StaffRegistration from "../main/Pages/Forms/StaffRegistration";

const MainRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/user-login" element={<LoginForm2 />} />
        <Route path="/admin/*" element={<SuperAdmin />} />
        <Route path="/clinic-registration" element={<ClinicForm />} />

        <Route path="/clinic-app/*" element={<PageTemplate />} />
        <Route path="/user-registration/*" element={<UserRegistration />} />
        <Route path="/doctor-registration/*" element={<RegistrationForm />} />
        <Route path="/nurse-registration/*" element={<NurseRegistration />} />
        <Route path="/staff-registration/*" element={<StaffRegistration />} />
      </Routes>
    </>
  );
};

export default MainRouter;
