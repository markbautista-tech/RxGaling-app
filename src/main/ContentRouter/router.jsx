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
import ProfileManagement from "../Pages/ProfileManagement/Profile";
import ClinicStaff from "../Pages/Owner/Staff";
import ClinicDoctors from "../Pages/Owner/Doctors";
import Pharmacy from "../Pages/Pharmacy";
import DoctorPage from "../Doctor";
import StaffManagement from "../Pages/StaffManagement";
import AddNewClinic from "../Pages/AddNewClinic";

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/*" exact element={<Dashboard />} />
      <Route path="/dashboard/*" exact element={<Dashboard />} />

      <Route path="/appointments/*" element={<Appointments />} />
      <Route path="/patients/*" element={<PatientsManangement />} />
      <Route path="/clinic-staff/*" element={<ClinicStaff />} />
      <Route path="/doctor-management/*" element={<ClinicDoctors />} />
      <Route path="/clinic-pharmacy/*" element={<Pharmacy />} />
      <Route path="/staff-management/" element={<StaffManagement />} />
      <Route path="/profile-management/*" element={<ProfileManagement />} />
      <Route path="/pharmacy-management/*" element={<Pharmacy />} />

      <Route path="/register-new-clinic/*" element={<AddNewClinic />} />
    </Routes>
  );
};

export default ContentRouter;
