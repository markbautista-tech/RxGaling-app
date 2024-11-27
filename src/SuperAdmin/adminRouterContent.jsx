import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";

import ClinicPage from "./Pages/ClinicPage";
import AdminDashboard from "./Pages/Dashboard";
import PharmacyPage from "./Pages/PharmacyPage";

const AdminRouterContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/clinic-page/*" element={<ClinicPage />} />
        <Route path="/pharmacy-page/*" element={<PharmacyPage />} />
      </Routes>
    </>
  );
};

export default AdminRouterContent;
