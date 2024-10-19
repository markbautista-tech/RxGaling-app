import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ViewRequestDetails from "./ViewRequest";
import getClinicRequest from "../../utils/data/fetch/getClinicRequest";
import getClinicDetails from "../../utils/data/fetch/getClinicDetails";
import { Link } from "react-router-dom";
import useClinicDetails from "../hooks/useClinicDetails";

// const request = [
//   {
//     id: 1,
//     clinic_name: "Acculife Medical and Laboratory Services",
//     clinic_owner: "Dr. Ray Mark Bautista",
//   },
//   {
//     id: 2,
//     clinic_name: "Quanterra Medical and Laboratory Services",
//     clinic_owner: "Dr. Ray Mark Bautista",
//   },
// ];

const ClinicRequestCard = () => {
  const { clinicData, clinicReq } = useClinicDetails();

  const getClinicName = (ownerId) => {
    if (!clinicData || clinicData.length === 0) {
      return "No Clinic";
    }

    const clinicName = clinicData.find((name) => name.owner_id === ownerId);
    return clinicName ? clinicName.name : "No Clinic";
  };

  return (
    <Card className="bg-secondary border shadow-lg max-h-[580px] lg:max-h-[500px] overflow-y-scroll no-scrollbar">
      <CardHeader>
        <CardTitle className="text-md lg:text-lg">Clinic Requests</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clinicReq.map((clinic_req) => (
            <div
              key={clinic_req.id}
              className="bg-primary/50 shadow-md p-3 rounded-md"
            >
              <div className="p-1 space-y-1">
                {/* <p className="text-sm lg:text-lg font-bold">Clinic Name:</p> */}
                <p className="text-sm lg:text-lg">
                  {getClinicName(clinic_req.owner_id)}
                </p>
                {/* <p className="text-sm lg:text-lg font-bold">Clinic Name:</p> */}
                <p className="text-sm lg:text-md">
                  Dr. {clinic_req.ClinicOwnerDetails.first_name}{" "}
                  {clinic_req.ClinicOwnerDetails.middle_name.charAt(0)}
                  {". "}
                  {clinic_req.ClinicOwnerDetails.last_name}
                </p>
              </div>
              <div className="flex justify-end">
                <Link to={`/clinic-request-details/${clinic_req.owner_id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                {/* <ViewRequestDetails givenID={clinic_req.owner_id} /> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default ClinicRequestCard;
