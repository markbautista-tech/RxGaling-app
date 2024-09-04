import { LuLayoutDashboard } from "react-icons/lu";
import { TbCalendarClock } from "react-icons/tb";
import { TbSettings } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { RiUserHeartLine } from "react-icons/ri";
import { TbUserPlus } from "react-icons/tb";
import { MdOutlineAnnouncement } from "react-icons/md";
import { FaLaptopMedical } from "react-icons/fa6";
import { TbHelp } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { TbUserCog } from "react-icons/tb";
import { centralSupabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <LuLayoutDashboard className="w-6 h-6" />
        <span>Dashboard</span>
      </div>
    </>
  );
};

const Appointments = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <TbCalendarClock className="w-6 h-6" />
        <span>Appointments</span>
      </div>
    </>
  );
};

const Announcements = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <MdOutlineAnnouncement className="w-6 h-6" />
        <span>Appointments</span>
      </div>
    </>
  );
};

const Patients = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <RiUserHeartLine className="w-6 h-6" />
        <span>Patients</span>
      </div>
    </>
  );
};

const PatientManagement = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <TbUserPlus className="w-6 h-6" />
        <span>Patients Management</span>
      </div>
    </>
  );
};

const EMR = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <FaLaptopMedical className="w-5 h-5" />
        <span>EMR</span>
      </div>
    </>
  );
};

const Pharmacy = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <GiMedicines className="w-6 h-6" />
        <span>Pharmacy</span>
      </div>
    </>
  );
};

const Nearby = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <FaHandHoldingMedical className="w-5 h-5" />
        <span>Nearby</span>
      </div>
    </>
  );
};

const Inventory = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <MdOutlineInventory2 className="w-5 h-5" />
        <span>Inventory</span>
      </div>
    </>
  );
};

const Reports = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <TbReportAnalytics className="w-6 h-6" />
        <span>Reports</span>
      </div>
    </>
  );
};

const Settings = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <TbSettings className="w-6 h-6" />
        <span>Settings</span>
      </div>
    </>
  );
};

const UserManagement = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <TbUserCog className="w-6 h-6" />
        <span>User Management</span>
      </div>
    </>
  );
};

const Help = () => {
  return (
    <>
      <div className="font-medium flex items-center justify-start p-3 gap-x-3">
        <TbHelp className="w-6 h-6" />
        <span>Help</span>
      </div>
    </>
  );
};

const Logout = () => {
  const navigate = useNavigate();
  async function logout() {
    const { error } = await centralSupabase.auth.signOut();
    if (!error) {
      navigate("/login");
    } else {
      alert("cant logout mah dude!");
    }
  }
  return (
    <>
      <div
        className="font-medium flex items-center justify-start p-3 gap-x-3"
        onClick={logout}
      >
        <TbLogout2 className="w-6 h-6" />
        <span>Logout</span>
      </div>
    </>
  );
};

export {
  Dashboard,
  Appointments,
  Announcements,
  Patients,
  PatientManagement,
  EMR,
  Pharmacy,
  Nearby,
  Inventory,
  Reports,
  Settings,
  UserManagement,
  Help,
  Logout,
};
