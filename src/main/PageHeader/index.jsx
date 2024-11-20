import { SidebarTrigger } from "@/components/ui/sidebar";
import UserGreeting from "./UserGreeting";
import { Separator } from "@/components/ui/separator";

const PageHeader = () => {
  return (
    <>
      <div className="bg-white border-b font-semibold w-full py-3 flex items-center z-50 px-5">
        <div className="flex gap-5 items-center">
          <SidebarTrigger />
          {/* <Separator orientation="vertical" className="" /> */}
          <p className="text-xs lg:text-lg font-bold">
            Prescription and Pharmacy Manangement System
          </p>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
