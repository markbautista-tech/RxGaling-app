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

const ContentRouter = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/appointments/*" element={<Appointments />} />
      <Route path="/patients/*" element={<PatientsManangement />} />
    </Routes>
  );
};

export default ContentRouter;
