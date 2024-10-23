import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const { countRequest } = useClinicDetails();
  const { clinicData, clinicReq } = useClinicDetails();

  const getClinicName = (ownerId) => {
    if (!clinicData || clinicData.length === 0) {
      return "No Clinic";
    }

    const clinicName = clinicData.find((name) => name.owner_id === ownerId);
    return clinicName ? clinicName.name : "No Clinic";
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-primary text-white text-xs lg:text-[16px] p-3 lg:p-4 shadow-md">
        Clinic Request{" "}
        <span className="ml-3 px-2 bg-white text-black rounded-sm font-semibold">
          {countRequest()}
        </span>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[70%] p-2 lg:p-10">
        <DialogHeader>
          <DialogTitle className="font-bold text-sm lg:text-2xl">
            Clinic Requests
          </DialogTitle>
          {/* <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription> */}
        </DialogHeader>
        <Card className="border-2 border-primary shadow-lg max-h-[580px] lg:max-h-[500px] overflow-y-scroll no-scrollbar">
          <CardHeader>
            {/* <CardTitle className="text-md lg:text-lg">
              Clinic Requests
            </CardTitle> */}
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
                    <p className="text-sm lg:text-lg">
                      <span className="font-semibold">Clinic Name: </span>{" "}
                      {getClinicName(clinic_req.owner_id)}
                    </p>
                    {/* <p className="text-sm lg:text-lg font-bold">Clinic Name:</p> */}
                    <p className="text-sm lg:text-md">
                      <span className="font-semibold">Owner: </span>
                      Dr. {clinic_req.ClinicOwnerDetails.first_name}{" "}
                      {clinic_req.ClinicOwnerDetails.middle_name.charAt(0)}
                      {". "}
                      {clinic_req.ClinicOwnerDetails.last_name}
                    </p>
                    <p className="text-sm lg:text-md">
                      <span className="font-semibold">Date Requested: </span>
                      {new Date(clinic_req.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
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
      </DialogContent>
    </Dialog>
  );
};

export default ClinicRequestCard;
