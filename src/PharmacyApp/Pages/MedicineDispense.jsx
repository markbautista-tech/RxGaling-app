import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SkeletonNoCircle } from "@/main/components/SkeletonNoCircle";
import ContentTitle from "@/main/PageContent/ContentTitle";
import React, { useEffect } from "react";

const MedicineDispense = () => {
  const [precription, setPrescription] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [filteredPrescriptions, setFilteredPrescriptions] = React.useState([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      setLoading(true);
      const pres = await fetchPrescription();

      setPrescription(pres);

      const results = precription.filter((prescrip) =>
        prescrip.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrescriptions(results);
      setLoading(false);
    };
  }, [searchTerm, precription]);

  return (
    <>
      <div>
        <div className="px-6 pt-4 lg:px-10 flex justify-between items-center">
          <ContentTitle title={"Medicine Dispenser"} />
        </div>
        <div className="py-3 lg:py-5 px-4 lg:px-6">
          <Separator orientation="horizontal" />
        </div>
        <div className="px-4 pt-4 lg:px-10">
          <Input
            placeholder="Search patient prescription..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-3 mt-4 lg:flex-row">
          <div className="h-[600px] border lg:w-[60%]">
            <div className="flex items-center justify-center">
              <span className="italic text-sm mt-10 text-gray-500"></span>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <SkeletonNoCircle />
                </div>
              ) : filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-3 border-b">
                    <h4 className="font-bold">{prescription.code}</h4>
                    <p>{prescription.details}</p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="italic text-sm text-gray-500">
                    No prescriptions found
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className=" bg-gray-200 border lg:w-[40%] p-3">
            <span className="">Medicine Dispenser</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineDispense;
