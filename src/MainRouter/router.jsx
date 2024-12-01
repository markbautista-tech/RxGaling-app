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
import DisplayRequestForm from "../SuperAdmin/components/DisplayRequestForm";
import StaffRegistration from "../main/Pages/Forms/StaffRegistration";
import ClinicManager from "../main/Pages/Manager";
import AddVitals from "@/main/Doctor/Prescription/AddVitals";
import AddPrescription from "@/main/Doctor/Prescription/AddPrescription";
import AppreciationMessage from "@/SuperAdmin/components/AppreciationMessage";
import SignUpForm from "@/main/Pages/Forms/SignUpForm";
import LoginForm from "@/main/Pages/Forms/LoginForm";
import { useUser } from "@/context/UserContext";
import UserSignUpForm from "@/main/Pages/Forms/UserSignUpForm";
import Registered from "@/main/Pages/Forms/Registered";
import PharmacyApp from "@/PharmacyApp";
import PharmacyRegistration from "@/PharmacyApp/components/PharmacyRegistration";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LoginForm />} />
        <Route path="/user-login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/user/sign-up" element={<UserSignUpForm />} />
        <Route path="/admin/*" element={<SuperAdmin />} />
        <Route
          path="/clinic-request-details/:id"
          element={<DisplayRequestForm />}
        />
        <Route path="/clinic-registration" element={<ClinicForm />} />
        <Route path="/register-success" element={<AppreciationMessage />} />
        <Route path="/clinic-app/*" element={<PageTemplate />} />
        {/* <Route path="/user-registration/*" element={<UserRegistration />} /> */}
        <Route path="/doctor-registration/*" element={<RegistrationForm />} />
        {/* <Route path="/nurse-registration/*" element={<NurseRegistration />} /> */}
        <Route path="/staff-registration/:id" element={<StaffRegistration />} />
        <Route path="/clinic-manager/*" element={<ClinicManager />} />
        <Route path="/add-vitals" element={<AddVitals />} />
        <Route path="/add-prescription" element={<AddPrescription />} />
        {/* CLINIC STAFF/DOCTOR REGISTERED */}
        <Route path="/registered" element={<Registered />} />

        {/* PHARMACY ROUTE */}
        <Route path="/pharmacy-app/*" element={<PharmacyApp />} />
        <Route
          path="/pharmacy-registration/"
          element={<PharmacyRegistration />}
        />
      </Routes>
    </>
  );
};

export default MainRouter;
