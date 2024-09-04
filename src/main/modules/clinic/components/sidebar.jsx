import {
  Dashboard,
  Appointments,
  Announcements,
  Patients,
  EMR,
  Pharmacy,
  Nearby,
  Inventory,
  Reports,
  Settings,
  UserManagement,
  Help,
  Logout,
  PatientManagement,
} from "../../../components/sideData";
import Logo from "../../../components/logo";

import "./styles/sidebar.css";

import { TbChevronDown } from "react-icons/tb";
import { TbChevronUp } from "react-icons/tb";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isDash =
    location.pathname.startsWith("/clinic-app/dashboard") ||
    location.pathname === "/clinic-app/dashoard";

  const isUserMan =
    location.pathname.startsWith("/clinic-app/user-management") ||
    location.pathname === "/clinic-app/user-management";

  const isPatientMan =
    location.pathname.startsWith("/clinic-app/patient-management") ||
    location.pathname === "/clinic-app/patient-management";

  const [expandedPatient, setExpandedPatient] = useState(false);
  const [expandedPharmacy, setExpandedPharmacy] = useState(false);
  const [expandedSettings, setExpandedSettings] = useState(false);

  // const toggleDropdown = () => setExpandedPatient(!expandedPatient);

  const patientOption = () => {
    setExpandedPharmacy(false);
    setExpandedSettings(false);
    setExpandedPatient(!expandedPatient);
  };

  const settingsOption = () => {
    setExpandedPharmacy(false);
    setExpandedPatient(false);
    setExpandedSettings(!expandedSettings);
  };

  const pharmacyOption = () => {
    setExpandedPatient(false);
    setExpandedSettings(false);
    setExpandedPharmacy(!expandedPharmacy);
  };

  return (
    <>
      <div className="bg-sidebar_bg h-full w-[260px] p-2">
        <div className="flex flex-col h-full">
          <div className="mt-9 p-2 flex items-center justify-center cursor-pointer">
            <Logo />
          </div>
          <div className="text-[#532B88] mt-9 h-full flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <div className="">
              <div className={`side-menu ${isDash ? "active" : ""}`}>
                <Link to="/clinic-app/dashboard">
                  <Dashboard />
                </Link>
              </div>
              <div className="side-menu">
                <Link to="/clinic-app/user-management">
                  <UserManagement />
                </Link>
              </div>
              <div
                className={`dropdown side-menu ${isPatientMan ? "active" : ""}`}
                onClick={patientOption}
              >
                <Patients />
                {expandedPatient ? (
                  <TbChevronUp className="w-5 h-5" />
                ) : (
                  <TbChevronDown className="w-5 h-5" />
                )}
              </div>
              {expandedPatient && (
                <div className="dropdown-container">
                  <div
                    className={`drop-menu ${isPatientMan ? "drop-active" : ""}`}
                  >
                    <Link to="/clinic-app/patient-management">
                      <PatientManagement />
                    </Link>
                  </div>
                  <div className="drop-menu">
                    <EMR />
                  </div>
                </div>
              )}
              <div className="side-menu">
                <Appointments />
              </div>

              <div className="dropdown side-menu" onClick={pharmacyOption}>
                <Pharmacy />
                {expandedPatient ? (
                  <TbChevronUp className="w-5 h-5" />
                ) : (
                  <TbChevronDown className="w-5 h-5" />
                )}
              </div>
              {expandedPharmacy && (
                <div className="dropdown-container">
                  <div className="drop-menu">
                    <Nearby />
                  </div>
                  <div className="drop-menu">
                    <Inventory />
                  </div>
                </div>
              )}

              <div className="side-menu mb-5">
                <Reports />
              </div>

              <Separator orientaion="horizontal" className="bg-gray-400" />

              <div className="dropdown side-menu" onClick={settingsOption}>
                <Settings />
                {expandedSettings ? (
                  <TbChevronUp className="w-5 h-5" />
                ) : (
                  <TbChevronDown className="w-5 h-5" />
                )}
              </div>
              {expandedSettings && (
                <div className="dropdown-container">
                  <div className="drop-menu"></div>
                  <div className="drop-menu">
                    <Help />
                  </div>
                </div>
              )}
              <div className="side-menu">
                <Announcements />
              </div>
            </div>
            <div className="">
              <div className="side-menu">
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
