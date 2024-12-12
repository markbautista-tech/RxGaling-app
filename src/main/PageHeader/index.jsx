import { SidebarTrigger } from "@/components/ui/sidebar";
import UserGreeting from "./UserGreeting";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import { logout } from "@/utils/data/logout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PageHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response === "success") {
      toast("Logged out!");
      navigate("/");
    }
  };

  return (
    <div className="bg-white border-b w-full py-3 px-5 flex items-center justify-between z-50">
      {/* Left Section: Sidebar Trigger and Title */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <p className="text-sm lg:text-lg font-bold">
          Prescription and Pharmacy Management System
        </p>
      </div>

      <div className="flex items-center gap-3">
        <LogOut
          onClick={handleLogout}
          className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
          size={20}
        />
      </div>
    </div>
  );
};

export default PageHeader;
