import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import AdminDashboard from "./components/Dashboard";
import ClinicPage from "./components/ClinicPage";

const AdminRouterContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/clinic-page/*" element={<ClinicPage />} />
      </Routes>
    </>
  );
};

export default AdminRouterContent;
