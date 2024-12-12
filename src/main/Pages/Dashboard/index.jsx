import React, { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import getDoctorDetails from "@/utils/data/fetch/getDoctorDetails";
import { toast } from "sonner";
import updateDocOnline from "@/utils/data/update/updateDocOnline";

const Dashboard = () => {
  const { user, role, ownerId } = useUser();
  const [doctors, setDoctors] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [patient, setPatient] = React.useState([]);
  const [pharmacy, setPharmacy] = React.useState([]);
  const [appointment, setAppointment] = React.useState([]);
  const [doctorOnline, setDoctorOnline] = React.useState([]);
  const [isOnline, setIsOnline] = useState(true);

  const { data: clinics, isLoading } = useUserClinics(user.id, user.clinic_id);

  useEffect(() => {
    const fetchData = async () => {
      const doctor = await fetchDoctorNumber();
      const users = await getClinicDoctor();
      const pat = await getPatientDetails();
      const pharmacy = await getClinicPharmacy();
      const appt = await getAppointments();
      const onlineDoc = await getDoctorDetails();

      setDoctors(doctor);
      setUsers(users);
      setPatient(pat);
      setPharmacy(pharmacy);
      setAppointment(appt);
      setDoctorOnline(onlineDoc);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedIsOn = localStorage.getItem("switchState");
    if (storedIsOn !== null) {
      setIsOnline(JSON.parse(storedIsOn));
    }
  }, []);

  const countDoctorsAndOwners = users.filter(
    (user) => user.role === "Doctor" || user.role === "Owner"
  ).length;

  const filteredOnlineDoctor = doctorOnline.filter(
    (doc) => doc.is_absent === false
  );

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

  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // Full month name (e.g., December)
    day: "numeric", // Day of the month
  });

  const handleSwitchChange = async () => {
    setIsOnline(!isOnline);
    localStorage.setItem("switchState", JSON.stringify(!isOnline));

    const response = await updateDocOnline(ownerId, isOnline);

    // if (response.error) {
    //   toast.error(response.error);
    // };

    console.log(ownerId, isOnline);
  };

  return (
    <>
      <div>
        <div className="py-4 flex justify-between">
          <ContentTitle title={"Dashboard"} />
          {role === "Doctor" && (
            <div className="flex items-center gap-3">
              <Label>Offline</Label>
              <Switch onCheckedChange={handleSwitchChange} checked={isOnline} />
              <Label className="text-green-500">Online</Label>
            </div>
          )}
        </div>
        <div className="pb-4">
          <Separator />
        </div>
        {/* <div className="flex justify-center gap-5 flex-col lg:flex-row items-center">
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
        </div> */}
        <div className=" lg:px-10 flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="bg-gray-100 shadow-lg w-[250px] h-[150px] p-5 rounded-lg border">
            <div className="flex justify-end">
              <span className="font-bold text-sm">
                Total Appointments Today
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
          {role === "Owner" && (
            <div className="bg-gray-100 shadow-lg w-[250px] h-[150px] p-5 rounded-lg border">
              <div className="flex justify-end">
                <span className="font-bold text-sm">
                  Total Pharmacy Partners
                </span>
              </div>
              <div className="flex items-center justify-between">
                <GiMedicines className="w-16 h-16 text-primary" />
                <span className="font-bold text-[60px] mr-7 ">
                  {pharmacy.length}
                </span>
              </div>
            </div>
          )}
        </div>
        {role !== "Doctor" && (
          <div className="border-2 shadow-md mt-5 lg:mt-10 lg:mx-28 rounded-md p-3 lg:p-5">
            <div className="flex lg:items-center lg:flex-row flex-col lg:justify-between">
              <span className="font-bold">Doctors Online Today</span>
              <span className="text-xs lg:text-sm">{date}</span>
            </div>
            <div className="py-4">
              <Separator className="bg-gray-600" />
            </div>
            {filteredOnlineDoctor.length > 0 ? (
              filteredOnlineDoctor.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-gray-100 flex flex-row items-start justify-between lg:px-5 lg:py-3 p-2 rounded-md"
                >
                  <div className="flex flex-col">
                    <span className="font-bold">
                      Dr. {doctor.users?.last_name}, {doctor.users?.first_name}{" "}
                      {doctor.users?.middle_name[0]}{" "}
                      {doctor.users?.suffix || ""}.
                    </span>
                    <span>{doctor.specialization}</span>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-500">
                    Active
                  </Badge>
                </div>
              ))
            ) : (
              <p>No online doctors today</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
