import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContentTitle from "@/main/PageContent/ContentTitle";
import React, { useEffect, useState } from "react";
import AddVitals from "../Prescription/AddVitals";
import { useParams } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import useGetVitals from "@/main/Doctor/hooks/useGetVitals";
import { getPatientById } from "@/utils/data/fetch/getPatientDetails";
import VitalRecordCard from "@/main/Pages/Appointments/components/VitalRecordCard";
import { SkeletonNoCircle } from "@/main/components/SkeletonNoCircle";
import useSOAPNotes from "@/main/Pages/Appointments/hooks/useSOAPNotes";
import SOAPCard from "@/main/Pages/Appointments/components/SOAPCard";
import AddSOAPNote from "../Prescription/AddSOAPNote";
import AddPrescription from "../Prescription/AddPrescription";
import useGetPrescriptions from "../hooks/useGetPrescriptions";
import AddMedicalCertidicate from "../Prescription/AddMedicalCertificate";
import fetchMedicalCertificate from "@/utils/data/fetch/fetchMedicalCertificate";
import PrescriptionCard from "@/main/Pages/Appointments/components/PrescriptionCard";
import MedicalCard from "@/main/Pages/Appointments/components/MedicalCard";

const MedicalRecordsPage = () => {
  const { id } = useParams();
  const { role } = useUser();
  const { ownerId, clinicId } = useUser();
  const [patient, setPatient] = useState([]);
  const { vitalLoading, vitals } = useGetVitals(id);
  const { soapNotes, soapLoading } = useSOAPNotes(id);
  const [medCerts, setMedCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { prescriptionWithId, presLoading } = useGetPrescriptions(id);
  const [currentPage, setCurrentPage] = useState("vitals");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    const fetchPatient = async () => {
      const p = await getPatientById(id);
      const medical = await fetchMedicalCertificate(id);
      setPatient(p);
      setMedCerts(medical);
    };
    fetchPatient();
    setLoading(false);
  }, [id]);

  return (
    <>
      <div>
        <div className="flex items-center gap-3 py-3">
          <ContentTitle title={"Medical Records"} />
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
        </div>
        <nav className="flex flex-wrap gap-3">
          <Button
            variant={currentPage === "vitals" ? "default" : "outline"}
            onClick={() => handleNavigation("vitals")}
            className="text-xs lg:text-sm w-32 shadow-md"
          >
            Vitals
          </Button>
          <Button
            variant={currentPage === "soap" ? "default" : "outline"}
            onClick={() => handleNavigation("soap")}
            className="text-xs lg:text-sm w-32 shadow-md"
          >
            SOAP Notes
          </Button>
          <Button
            variant={currentPage === "pres" ? "default" : "outline"}
            onClick={() => handleNavigation("pres")}
            className="text-xs lg:text-sm w-32 shadow-md"
          >
            Prescription
          </Button>
          <Button
            variant={currentPage === "medcert" ? "default" : "outline"}
            onClick={() => handleNavigation("medcert")}
            className="w-36 text-xs lg:text-sm shadow-md"
          >
            Medical Certificate
          </Button>
        </nav>
        <div className="bg-gray-100 w-full h-screen my-5 rounded-md p-5">
          {currentPage === "vitals" && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold lg:text-lg">Vitals Records</span>
                <AddVitals
                  patientid={id}
                  userid={ownerId}
                  clinicid={clinicId}
                />
              </div>
              <div className="mt-5">
                {vitalLoading ? (
                  <SkeletonNoCircle />
                ) : vitals.length > 0 ? (
                  vitals.map((vitals, ids) => (
                    <VitalRecordCard key={ids} vitalSigns={vitals} />
                  ))
                ) : (
                  <p className="italic">No vital signs record</p>
                )}
              </div>
            </>
          )}
          {currentPage === "soap" && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold lg:text-lg">SOAP Notes</span>
                {role === "Doctor" && (
                  <AddSOAPNote
                    patientid={id}
                    userid={ownerId}
                    clinicid={clinicId}
                  />
                )}
              </div>
              <div className="mt-5">
                {soapLoading ? (
                  <SkeletonNoCircle />
                ) : soapNotes.length > 0 ? (
                  soapNotes.map((soaps, ids) => (
                    <SOAPCard key={ids} soaps={soaps} patient={patient} />
                  ))
                ) : (
                  <p className="italic">No SOAP notes record</p>
                )}
              </div>
            </>
          )}
          {currentPage === "pres" && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold lg:text-lg">Prescriptions</span>
                {role === "Doctor" && (
                  <AddPrescription
                    patientid={id}
                    userid={ownerId}
                    clinicid={clinicId}
                  />
                )}
              </div>
              <div className="mt-5">
                {presLoading ? (
                  <SkeletonNoCircle />
                ) : prescriptionWithId.length > 0 ? (
                  prescriptionWithId.map((soaps, ids) => (
                    <PrescriptionCard
                      key={ids}
                      patient={patient}
                      prescription={prescriptionWithId}
                    />
                  ))
                ) : (
                  <p className="italic">No Prescription record</p>
                )}
              </div>
            </>
          )}
          {currentPage === "medcert" && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold lg:text-lg">
                  Medical Certificates
                </span>
                <AddMedicalCertidicate
                  patient={patient}
                  userid={ownerId}
                  clinicid={clinicId}
                />
              </div>
              <div className="mt-5">
                {loading ? (
                  <SkeletonNoCircle />
                ) : medCerts.length > 0 ? (
                  medCerts.map((meds, ids) => (
                    <MedicalCard
                      key={ids}
                      patient={patient}
                      medCerts={medCerts}
                    />
                  ))
                ) : (
                  <p className="italic">No Medical Certificate record</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicalRecordsPage;
