import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SkeletonNoCircle } from "@/main/components/SkeletonNoCircle";
import ContentTitle from "@/main/PageContent/ContentTitle";
import fetchPrescription from "@/utils/data/fetch/fetchPrescription";
import { FaPrescription } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

const MedicineDispense = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Initialize year
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        const response = await fetchPrescription();
        setPrescriptions(response);
        setFilteredPrescriptions(response);
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  useEffect(() => {
    const results = prescriptions.filter((prescription) =>
      Object.values(prescription)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPrescriptions(results);
  }, [searchTerm, prescriptions]);

  // Construct the final search term
  const finalSearch = searchTerm ? `${currentYear}-${searchTerm}` : "";

  const handlePrescriptionClick = (prescription) => {
    setSelectedPrescription(prescription);
  };

  return (
    <div>
      <div className="pt-4 lg:px-10 flex justify-between items-center">
        <ContentTitle title={"Medicine Dispenser"} />
      </div>
      <div className="py-3 lg:py-5 lg:px-6">
        <Separator orientation="horizontal" />
      </div>
      <div className="px-4 pt-4 lg:px-10 flex items-center gap-2">
        <Input value={currentYear} className="w-[70px]" readOnly />
        <p>-</p>
        <Input
          placeholder="Search patient prescription code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-3 mt-4 lg:flex-row">
        <div className="h-[600px] border lg:w-[60%] overflow-y-auto justify-center">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <SkeletonNoCircle />
            </div>
          ) : filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className={`${
                  prescription.code === finalSearch
                    ? "border bg-white shadow-md px-5 py-4 w-[280px] lg:w-[350px] mt-10 rounded-md flex flex-col"
                    : "hidden"
                }`}
              >
                <span className="font-bold">{prescription.code}</span>
                <span className="text-xs lg:text-sm">
                  Name: {prescription.patients?.last_name},{" "}
                  {prescription.patients?.first_name}{" "}
                  {prescription.patients?.middle_name}{" "}
                  {prescription.patients?.suffix || ""}
                </span>
                <div className="flex gap-5">
                  <span className="text-xs lg:text-sm">
                    {prescription.patients?.age} years old
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs lg:text-sm">
                    {prescription.patients?.gender}
                  </span>
                </div>
                <div
                  className="border p-1 cursor-pointer hover:bg-secondary"
                  onClick={() => handlePrescriptionClick(prescription)}
                >
                  <div className="flex gap-3">
                    <span className="text-xs lg:text-sm">
                      <b>{prescription.generic_name}</b>
                      {" ("}
                      {prescription.brand_name}
                      {") "}
                      {prescription.dosage}/{prescription.form} #
                      {prescription.quantity}
                    </span>
                  </div>
                  <div className="flex gap-5 items-center py-1">
                    <span className="text-xs text-gray-500">SIG: </span>
                    <span className="text-xs lg:text-sm">
                      {prescription.sig}
                    </span>
                  </div>
                  <div className="flex gap-5 items-center py-1">
                    <span className="text-xs text-gray-500">REMARKS: </span>
                    <span className="text-xs lg:text-sm">
                      {prescription.remarks}
                    </span>
                  </div>
                </div>
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
        <div className="bg-gray-200 border lg:w-[40%] p-3">
          <span>Medicine Dispenser</span>
          <div className="py-5 space-y-3">
            <div>
              <Label>Generic Name:</Label>
              <Input
                value={selectedPrescription?.generic_name || ""}
                readOnly
              />
            </div>
            <div>
              <Label>Brand Name:</Label>
              <Input value={selectedPrescription?.brand_name || ""} readOnly />
            </div>
            <div>
              <Label>Dosage:</Label>
              <Input value={selectedPrescription?.dosage || ""} readOnly />
            </div>
            <div>
              <Label>Quantity:</Label>
              <Input value={selectedPrescription?.quantity || ""} readOnly />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedPrescription(null)}
              >
                Clear
              </Button>
              <Button>Dispense</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDispense;
