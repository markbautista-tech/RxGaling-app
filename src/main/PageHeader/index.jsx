import { SidebarTrigger } from "@/components/ui/sidebar";
import UserGreeting from "./UserGreeting";

const PageHeader = () => {
  return (
    <>
      <div className="bg-secondary border-b font-semibold w-full py-3 flex items-center z-50 px-5">
        <div className="flex gap-5">
          <SidebarTrigger />
          <p className="text-xs lg:text-lg font-bold text-primary">
            Prescription and Pharmacy Manangement System
          </p>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
