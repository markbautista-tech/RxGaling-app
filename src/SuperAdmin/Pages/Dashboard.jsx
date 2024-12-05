import { Separator } from "@/components/ui/separator";
import ContentTitle from "@/main/PageContent/ContentTitle";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Archive, Hospital } from "lucide-react";
import useCompleteClinicDetails from "../hooks/useCompleteClinicDetails";
import usePharmacyDetails from "@/PharmacyApp/hooks/usePharmacyDetails";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { SkeletonLoading } from "@/main/components/Skeleton";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { clinicDetails, loading: clinicLoading } = useCompleteClinicDetails();
  const { loading: pharmacyLoading, pharmacyDetails } = usePharmacyDetails();

  const [statusCounts, setStatusCounts] = useState({
    verified: 0,
    archived: 0,
    declined: 0,
  });

  useEffect(() => {
    if (!clinicLoading && !pharmacyLoading) {
      // Ensure both clinicDetails and pharmacyDetails are arrays
      const clinics = Array.isArray(clinicDetails) ? clinicDetails : [];
      const pharmacies = Array.isArray(pharmacyDetails) ? pharmacyDetails : [];

      const allDetails = [...clinics, ...pharmacies];

      const counts = allDetails.reduce(
        (acc, item) => {
          switch (item.status) {
            case "Verified":
              acc.verified += 1;
              break;
            case "Archived":
              acc.archived += 1;
              break;
            case "Declined":
              acc.declined += 1;
              break;
            default:
              break;
          }
          return acc;
        },
        { verified: 0, archived: 0, declined: 0 } // Initial values
      );

      setStatusCounts(counts);
    }
  }, [clinicLoading, pharmacyLoading, clinicDetails, pharmacyDetails]);

  return (
    <>
      <div className="">
        <div>
          <div className="px-6 pt-4 lg:px-10 flex justify-between items-center">
            <div>
              <ContentTitle title={"Dashboard"} />
            </div>
          </div>
        </div>
        <div className="my-3 px-4">
          <Separator orientation="horizontal" className="w-full" />
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-10 py-3 lg:py-5 px-3 lg:px-10 ">
          <div className="w-full shadow-lg">
            <Card
              className="bg-purple-300 cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate("/admin/clinic-page")}
            >
              {clinicLoading ? (
                <SkeletonLoading />
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="flex gap-5">
                      <Hospital className="w-6 h-6" />
                      Total Clinics
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="lg:px-10">
                    <span className="text-[70px] font-bold flex justify-end">
                      {clinicDetails.length}
                    </span>
                  </CardContent>
                  <CardFooter></CardFooter>
                </>
              )}
            </Card>
          </div>
          <div className="w-full shadow-lg">
            <Card
              className="bg-purple-400 cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate("/admin/pharmacy-page")}
            >
              {pharmacyLoading ? (
                <SkeletonLoading />
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="flex gap-5">
                      <Hospital className="w-6 h-6" />
                      Total Pharmacy
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="lg:px-10">
                    <span className="text-[70px] font-bold flex justify-end">
                      {pharmacyDetails.length}
                    </span>
                  </CardContent>
                  <CardFooter></CardFooter>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
