import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import MedicineDispense from "../Pages/MedicineDispense";
import PharmacyStaffManagement from "@/main/Pages/Pharmacy/StaffManagement";
import Inventory from "../Pages/Inventory";
import PharmacyProfileManagement from "@/main/Pages/ProfileManagement/PharmacyProfile";

const PharmacyContentRouter = () => {
  return (
    <Routes>
      <Route path="/*" exact element={<Dashboard />} />
      <Route path="/profile-management" exact element={<PharmacyProfileManagement />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/dispenser" exact element={<MedicineDispense />} />
      <Route
        path="/pharmacy-staff"
        exact
        element={<PharmacyStaffManagement />}
      />
      <Route path="/medicine-inventory" exact element={<Inventory />} />
    </Routes>
  );
};

export default PharmacyContentRouter;
