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

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/appointments/*" element={<Appointments />} />
      <Route path="/patients/*" element={<PatientsManangement />} />
      <Route path="/user-management/*" element={<UserManagement />} />
    </Routes>
  );
};

export default ContentRouter;
