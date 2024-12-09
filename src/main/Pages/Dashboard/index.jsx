import React, { useEffect } from "react";
import ContentTitle from "../../PageContent/ContentTitle";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import useUserClinics, {
  fetchDoctorNumber,
  getClinicDoctor,
} from "@/utils/data/fetch/fetchUserClinics";
import { FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { LuCalendarClock } from "react-icons/lu";
import { RiUserHeartLine } from "react-icons/ri";
import getPatientDetails from "@/utils/data/fetch/getPatientDetails";
import { getClinicPharmacy } from "@/utils/data/fetch/fetchUserPharmacies";
import { getAppointments } from "@/utils/data/fetch/getAppointments";

const Dashboard = () => {
  const { user } = useUser();
  const [doctors, setDoctors] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [patient, setPatient] = React.useState([]);
  const [pharmacy, setPharmacy] = React.useState([]);
  const [appointment, setAppointment] = React.useState([]);

  const { data: clinics, isLoading } = useUserClinics(user.id, user.clinic_id);

  useEffect(() => {
    const fetchData = async () => {
      const doctor = await fetchDoctorNumber();
      const users = await getClinicDoctor();
      const pat = await getPatientDetails();
      const pharmacy = await getClinicPharmacy();
      const appt = await getAppointments();

      setDoctors(doctor);
      setUsers(users);
      setPatient(pat);
      setPharmacy(pharmacy);
      setAppointment(appt);
    };
    fetchData();
  }, []);

  const countDoctorsAndOwners = users.filter(
    (user) => user.role === "Doctor" || user.role === "Owner"
  ).length;

  const today = new Date().toISOString().split("T")[0];

  // Count the appointments for today
  const appointmentsToday = appointment.filter((appt) => {
    if (!appt.appointment_date) return false; // Skip if `date` is undefined or null
    const appointmentDate = new Date(appt.appointment_date);
    return (
      !isNaN(appointmentDate) &&
      appointmentDate.toISOString().split("T")[0] === today
    );
  }).length;

  return (
    <>
      <div>
        <div className="py-4">
          <ContentTitle title={"Dashboard"} />
        </div>
        <div className="py-4">
          <Separator />
        </div>
        <div className="flex justify-center gap-5 flex-col lg:flex-row items-center">
          <div className="bg-white shadow-lg w-[350px] h-[200px] p-5 rounded-lg border">
            <div className="flex justify-end">
              <span className="font-bold">Total Doctors</span>
            </div>
            <div className="flex justify-between items-center">
              <FaUserDoctor className="w-28 h-28 text-blue-500" />
              <span className="font-bold text-[80px] mr-7 ">
                {doctors.length}
              </span>
            </div>
          </div>
          <div className="bg-white shadow-lg w-[350px] h-[200px] p-5 rounded-lg border">
            <div className="flex justify-end">
              <span className="font-bold">Total Clinic Staffs</span>
            </div>
            <div className="flex justify-between items-center">
              <FaUserNurse className="w-28 h-28 text-blue-500" />
              <span className="font-bold text-[80px] mr-7 ">
                {countDoctorsAndOwners}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:px-10 flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="bg-gray-100 shadow-lg w-[250px] h-[150px] p-5 rounded-lg border">
            <div className="flex justify-end">
              <span className="font-bold text-sm">Total Pharmacy Partners</span>
            </div>
            <div className="flex items-center justify-between">
              <GiMedicines className="w-16 h-16 text-primary" />
              <span className="font-bold text-[60px] mr-7 ">
                {pharmacy.length}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 shadow-lg w-[250px] h-[150px] p-5 rounded-lg border">
            <div className="flex justify-end">
              <span className="font-bold text-sm">
                Total Appointments per Day
              </span>
            </div>
            <div className="flex items-center justify-between">
              <LuCalendarClock className="w-16 h-16 text-primary" />
              <span className="font-bold text-[60px] mr-7 ">
                {appointmentsToday}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 shadow-lg w-[250px] h-[150px] p-5 rounded-lg border">
            <div className="flex justify-end">
              <span className="font-bold text-sm">Total Patients</span>
            </div>
            <div className="flex justify-between items-center">
              <RiUserHeartLine className="w-16 h-16 text-primary" />
              <span className="font-bold text-[60px] mr-7 ">
                {patient.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
