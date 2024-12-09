import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import AddVitals from "@/main/Doctor/Prescription/AddVitals";
import AddSOAPNote from "@/main/Doctor/Prescription/AddSOAPNote";
import AddPrescription from "@/main/Doctor/Prescription/AddPrescription";
import AddMedicalCertidicate from "@/main/Doctor/Prescription/AddMedicalCertificate";
import getVitalSigns from "@/utils/data/fetch/getVitalSigns";
import useSOAPNotes from "../hooks/useSOAPNotes";
import VitalRecordCard from "./VitalRecordCard";
import SOAPCard from "./SOAPCard";
import { SkeletonNoCircle } from "@/main/components/SkeletonNoCircle";
import useGetPrescriptions from "@/main/Doctor/hooks/useGetPrescriptions";
import PrescriptionCard from "./PrescriptionCard";
import { fetchPrescriptionWithId } from "@/utils/data/fetch/fetchPrescription";
import fetchMedicalCertificate from "@/utils/data/fetch/fetchMedicalCertificate";
import MedicalCard from "./MedicalCard";

const ManageRecords = ({ patient }) => {
  const { soapLoading, soapNotes } = useSOAPNotes(patient.patient_id);
  const [prescription, setPrescription] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [medCerts, setMedCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("vitals");

  useEffect(() => {
    setLoading(true);
    const fetchVitals = async () => {
      const vsigns = await getVitalSigns(patient.patient_id);
      const pres = await fetchPrescriptionWithId(patient.patient_id);
      const medical = await fetchMedicalCertificate(patient.patient_id);

      setVitalSigns(vsigns);
      setPrescription(pres);
      setMedCerts(medical);
    };
    fetchVitals();
    setLoading(false);
  }, [patient.patient_id]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger className="w-full text-sm text-left p-2 rounded-md hover:bg-secondary">
            Manage Records
          </DialogTrigger>
          <DialogContent className="bottom-0 lg:p-5">
            <DialogHeader className="sticky">
              <DialogTitle className="text-lg flex flex-col gap-2">
                <span>Manage Medical Records</span>
                <span>{patient.clinics?.name.toUpperCase() || "unknown"}</span>
              </DialogTitle>
              <DialogDescription className="py-2 flex flex-col">
                <span className="text-lg">{`${patient.patients?.last_name.toUpperCase()}, ${patient.patients?.first_name.toUpperCase()} ${patient.patients?.middle_name.toUpperCase()} ${patient.patients?.suffix.toUpperCase() || ""}`}</span>
                <span>{`${patient.patients?.age || ""} years old`}</span>
              </DialogDescription>
              <nav className="flex space-x-2">
                <Button
                  variant={currentPage === "vitals" ? "default" : "outline"}
                  onClick={() => handleNavigation("vitals")}
                  className="w-32"
                >
                  Vitals
                </Button>
                <Button
                  variant={currentPage === "soap" ? "default" : "outline"}
                  onClick={() => handleNavigation("soap")}
                  className="w-32"
                >
                  SOAP Notes
                </Button>
                <Button
                  variant={currentPage === "pres" ? "default" : "outline"}
                  onClick={() => handleNavigation("pres")}
                  className="w-32"
                >
                  Prescription
                </Button>
                <Button
                  variant={currentPage === "medcert" ? "default" : "outline"}
                  onClick={() => handleNavigation("medcert")}
                >
                  Medical Certificate
                </Button>
              </nav>
              <Separator />
            </DialogHeader>

            <div className="p-4 border rounded-md h-screen overflow-y-auto no-scrollbar">
              {currentPage === "vitals" && (
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-bold">Vital Signs Records</span>
                    </div>
                    <AddVitals patient={patient} />
                  </div>
                  <div className="">
                    {loading ? (
                      <SkeletonNoCircle />
                    ) : vitalSigns.length > 0 ? (
                      vitalSigns.map((vitals, ids) => (
                        <VitalRecordCard
                          key={ids}
                          patient={patient}
                          vitalSigns={vitals}
                        />
                      ))
                    ) : (
                      <p className="italic">No vital signs record</p>
                    )}
                  </div>
                </div>
              )}
              {currentPage === "soap" && (
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-bold">SOAP Notes</span>
                    </div>
                    <AddSOAPNote patient={patient} />
                  </div>
                  <div className="">
                    {soapLoading ? (
                      <SkeletonNoCircle />
                    ) : soapNotes.length > 0 ? (
                      soapNotes.map((soaps, ids) => (
                        <SOAPCard key={ids} patient={patient} soaps={soaps} />
                      ))
                    ) : (
                      <p className="italic">No vital signs record</p>
                    )}
                  </div>
                </div>
              )}
              {currentPage === "pres" && (
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-bold">Prescriptions</span>
                    </div>
                    <AddPrescription patient={patient} />
                  </div>
                  <div>
                    {loading ? (
                      <SkeletonNoCircle />
                    ) : prescription?.length > 0 ? (
                      prescription.map((prescription, ids) => (
                        <PrescriptionCard
                          key={ids}
                          patient={patient}
                          prescription={prescription}
                        />
                      ))
                    ) : (
                      <p className="italic">No prescriptions record</p>
                    )}
                  </div>
                </div>
              )}
              {currentPage === "medcert" && (
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-bold">Medical Certificates</span>
                    </div>
                    <AddMedicalCertidicate patient={patient} />
                  </div>
                  <div>
                    {loading ? (
                      <SkeletonNoCircle />
                    ) : medCerts?.length > 0 ? (
                      medCerts.map((medCerts, ids) => (
                        <MedicalCard
                          key={ids}
                          patient={patient}
                          medCerts={medCerts}
                        />
                      ))
                    ) : (
                      <p className="italic">No prescriptions record</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ManageRecords;
