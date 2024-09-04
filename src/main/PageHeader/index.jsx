import UserGreeting from "./UserGreeting";

const PageHeader = () => {
  return (
    <>
      <div className="bg-secondary border-b font-semibold fixed left-0 lg:left-[250px] w-full py-3 ps-10 flex items-center z-50">
        <div className="flex-1">
          <p className="text-xs lg:text-lg font-bold text-primary">
            Prescription and Pharmacy Manangement System
          </p>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
