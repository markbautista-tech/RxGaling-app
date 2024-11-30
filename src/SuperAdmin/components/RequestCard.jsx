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
import { FileText, FileUser } from "lucide-react";
import useRequestCard from "../hooks/useRequestCard";

const ClinicRequestCard = () => {
  const { clinicOwner, clinic, countRequest, getClinicName } = useRequestCard();

  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-primary text-white text-xs lg:text-[16px] py-3 px-4 shadow-md flex gap-3 items-center">
        <FileUser className="w-5 h-5" />
        <span className="hidden sm:block">Clinic Request</span>
        {countRequest != null && (
          <span className="bg-white py-1 px-2 text-red-600 rounded-full font-semibold">
            {countRequest()}
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="lg:max-w-[70%] p-2 lg:p-10">
        <DialogHeader>
          <DialogTitle className="font-bold text-sm lg:text-2xl flex items-center gap-5">
            <span className="bg-white py-1 px-2 text-red-600 rounded-full font-semibold">
              {countRequest()}
            </span>
            Clinic Requests
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Card className="border-0 max-h-[580px] lg:max-h-[500px] overflow-y-scroll no-scrollbar">
          <CardHeader>
            {/* <CardTitle className="text-md lg:text-lg">
              Clinic Requests
            </CardTitle> */}
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clinic.map((clinic_req) => (
                <div
                  key={clinic_req.id}
                  className="border border-primary shadow-md p-3 rounded-md"
                >
                  <div className="p-1 space-y-1">
                    <p className="text-sm lg:text-lg">
                      <span className="font-semibold">Clinic Name: </span>{" "}
                      {getClinicName(clinic_req.owner_id)}
                    </p>
                    {/* <p className="text-sm lg:text-lg font-bold">Clinic Name:</p> */}
                    <p className="text-sm lg:text-md">
                      <span className="font-semibold">Owner: </span>
                      Dr. {clinic_req.users.first_name}{" "}
                      {clinic_req.users.middle_name.charAt(0)}
                      {". "}
                      {clinic_req.users.last_name}
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
                      <Button
                        variant="secondary"
                        className="border border-primary"
                      >
                        View Details
                      </Button>
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
