"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartPie,
  Command,
  Frame,
  GalleryVerticalEnd,
  Hospital,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user-pharmacy";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TbCalendarClock, TbSettings } from "react-icons/tb";
import { RiUserHeartLine } from "react-icons/ri";
import { NavNoDrop } from "./nav-nodrop";
import { usePharmacyUser } from "@/context/UserPharmacyContext";
import { AdminManage } from "./nav-adminManagement";
import { AdminDashboard } from "./admin-dashboard";
import { NavAdmin } from "./nav-admin";
import { GiMedicines } from "react-icons/gi";
import { NavReports } from "./nav-reports";
import { useUserPharmacies } from "@/utils/data/fetch/fetchUserPharmacies";
import NavAllData from "./nav-all-data";
import NavPharmacy from "./nav-pharmacy";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    avatar: "/avatars/shadcn.jpg",
  },
  admin: {
    name: "Admin",
    avatar: "src/assets/logo-rxgaling.svg",
  },
  teams: [
    {
      name: "Acculife Laboratory Services",
      logo: GalleryVerticalEnd,
      plan: "Verified",
    },
  ],
  navNoDrop: [
    {
      title: "Dashboard",
      url: "/clinic-app/dashboard",
      icon: RiDashboardHorizontalLine,
      isActive: true,
    },
    {
      title: "Appointments",
      url: "/clinic-app/appointments",
      icon: TbCalendarClock,
    },
    {
      title: "Patients",
      url: "/clinic-app/patients",
      icon: RiUserHeartLine,
    },
  ],
  navReports: [
    {
      title: "Reports",
      url: "",
      icon: ChartPie,
    },
  ],
  navMain: [
    {
      title: "Management",
      url: "#",
      icon: TbSettings,
      items: [
        {
          title: "Manage Doctors",
          url: "/clinic-app/doctor-management",
        },
        {
          title: "Manage Staff",
          url: "/clinic-app/staff-management",
        },
        {
          title: "Pharmacy",
          url: "#",
        },
      ],
    },
  ],
  navAdmin: [
    {
      title: "Management",
      url: "#",
      icon: TbSettings,
      items: [
        {
          title: "Manage Clinic",
          url: "/admin/clinic-page",
        },
        {
          title: "Manage Pharmacy",
          url: "",
        },
      ],
    },
  ],
  adminDash: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: RiDashboardHorizontalLine,
      isActive: true,
    },
    {
      title: "Manage Clinic",
      url: "/admin/clinic-page",
      icon: Hospital,
    },
    {
      title: "Manage Pharmacy",
      url: "/admin/pharmacy-page",
      icon: GiMedicines,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { pharmacyUser, pharmacyLoading, setPharmacyUser, pharmacyRole, pharmacyEmail, ownerLname } = usePharmacyUser();
  const [admin, setAdmin] = React.useState(pharmacyRole === "admin");

  const { data: pharmacies, isLoading } = useUserPharmacies(
    pharmacyUser.id,
    pharmacyUser.clinic_id
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {!admin ? (
          !admin && isLoading ? (
            <div>Loading...</div>
          ) : (
            <TeamSwitcher teams={pharmacies} />
          )
        ) : (
          <NavAdmin pharmacyUser={data.admin} pharmacyEmail={pharmacyEmail} />
        )}
      </SidebarHeader>
      <SidebarContent>
        {pharmacyRole !== "admin" ? <NavPharmacy /> : <AdminDashboard items={data.adminDash} />}
      </SidebarContent>
      <SidebarFooter>
        {/* {role === "admin" && <NavAdmin user={data.admin} email={email} />} */}
        {!admin && (
          <NavUser
            user={pharmacyUser}
            email={pharmacyEmail}
            lname={ownerLname}
            role={pharmacyRole}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
