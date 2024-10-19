import React from "react";

import
{
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import CMDashboard from "./CMDashboard";
import SchedulingStaff from './Scheduling/Staff'
import SchedulingDoctor from './Scheduling/Doctor'
import Profile from "./Profile";



const CMRoutes = () =>
{
  return (
    <Routes>
      <Route path="/" name="dashboard" exact element={<CMDashboard />} />
      <Route path="/schedule-doctor" name="schedule-doctor" exact element={<SchedulingDoctor />} />
      <Route path="/schedule-staff" name="schedule-staff" exact element={<SchedulingStaff />} />
      <Route path="/profile" name="schedule-staff" exact element={<Profile />} />
    </Routes>
  );
};

export default CMRoutes;
