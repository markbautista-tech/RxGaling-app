import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";

import Appointments from "../Pages/Appointments";
import Dashboard from "../Pages/Dashboard";
import PatientsManangement from "../Pages/Patients";
import UserManagement from "../Pages/UserManagement";
import PatientRegistration from "../Pages/Forms/PatientRegistration";
import ProfileManagement from "../Pages/ProfileManagement";
import ClinicStaff from "../Pages/Owner/Staff";
import ClinicDoctors from "../Pages/Owner/Doctors";
import Pharmacy from "../Pages/Pharmacy";

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/dashboard/*" exact element={<Dashboard />} />

      <Route path="/appointments/*" element={<Appointments />} />
      <Route path="/patients/*" element={<PatientsManangement />} />
      <Route path="/clinic-staff/*" element={<ClinicStaff />} />
      {/* <Route path="/clinic-doctors/*" element={<ClinicDoctors />} /> */}
      <Route path="/clinic-pharmacy/*" element={<Pharmacy />} />
      <Route path="/user-management/*" element={<UserManagement />} />
      <Route path="/profile-management/*" element={<ProfileManagement />} />
    </Routes>
  );
};

export default ContentRouter;
