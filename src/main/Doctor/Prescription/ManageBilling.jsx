import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IoIosAddCircle } from "react-icons/io";
import ContentTitle from "@/main/PageContent/ContentTitle";
import { getPatientById } from "@/utils/data/fetch/getPatientDetails";
import { useParams } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

const ManageBilling = () => {
  const { id } = useParams();
  const { ownerId, clinicIdn, role } = useUser();
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchPatient = async () => {
      const p = await getPatientById(id);
      setPatient(p);
    };
    fetchPatient();
    setLoading(false);
  }, [id]);

  const addService = (service) => {
    setServices((prev) => [...prev, service]);
  };

  const removeService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-3 py-3">
          <ContentTitle title={"Billing"} />
        </div>
        <div className="pb-2">
          <Separator />
        </div>
        <div className="flex flex-col py-4">
          <span className="font-bold">
            {`${patient[0]?.last_name.toUpperCase()}, ${patient[0]?.first_name.toUpperCase()} ${patient[0]?.middle_name.toUpperCase()} ${patient[0]?.suffix.toUpperCase() || ""}`}
          </span>
          <span>
            {patient[0]?.age} yrs old | {patient[0]?.gender}
          </span>
          <div className="mt-4">
            <span className="font-bold">Services: </span>
          </div>
          <div className="w-full h-[50px] flex items-center gap-3 p-4">
            <div
              className="rounded-full bg-gray-600 flex gap-2 lg:w-36 w-32 py-2 justify-center items-center text-white cursor-pointer"
              onClick={() =>
                addService({
                  name: "Consultation",
                  description: "General consultation",
                  quantity: 1,
                  amount: 50,
                })
              }
            >
              <Plus className="w-5 h-5 text-center" />
              <span className="text-xs lg:text-sm">Consultation</span>
            </div>
            <div
              className="rounded-full bg-gray-600 flex gap-2 lg:w-48 w-44 py-2 justify-center items-center text-white cursor-pointer"
              onClick={() =>
                addService({
                  name: "Follow-up Consultation",
                  description: "Review consultation",
                  quantity: 1,
                  amount: 30,
                })
              }
            >
              <Plus className="w-5 h-5 text-center" />
              <span className="text-xs lg:text-sm">Follow-up Consultation</span>
            </div>
          </div>
          <p className="italic text-xs">
            Click services to add billing for the patient.
          </p>
          <div className="border shadow-sm lg:mx-20 mt-5 p-3">
            <div className="flex gap-10 text-xs lg:text-sm font-bold">
              <span className="">Service</span>
              <span className="">Description</span>
              <span className="">Quantity</span>
              <span className="">Amount</span>
              <span className="">Actions</span>
            </div>
            {services.length > 0 ? (
              services.map((service, index) => (
                <div
                  key={index}
                  className="flex gap-10 text-xs lg:text-sm items-center mt-2"
                >
                  <span className="">{service.name}</span>
                  <span className="">{service.description}</span>
                  <span className="">{service.quantity}</span>
                  <span className="">{service.amount}</span>
                  <button
                    className="text-red-500"
                    onClick={() => removeService(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center mt-4 text-xs lg:text-sm italic">
                No services added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBilling;
