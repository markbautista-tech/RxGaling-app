import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";
import usePharmacyDetails from "@/PharmacyApp/hooks/usePharmacyDetails";
import { SkeletonLoading } from "@/main/components/Skeleton";
import { Link } from "react-router-dom";

const PharmacyRequest = () => {
  const { loading, requestData, unverifiedCount } = usePharmacyDetails();

  return (
    <>
      <Dialog>
        <DialogTrigger className="rounded-md bg-primary text-white text-xs lg:text-[16px] py-3 px-4 shadow-md flex gap-3 items-center">
          <FileUser className="w-5 h-5" />
          <span className="hidden sm:block">
            Pharmacy Request <span>{unverifiedCount}</span>
          </span>
        </DialogTrigger>
        <DialogContent className="lg:max-w-[70%] p-2 lg:p-10">
          <DialogHeader>
            <DialogTitle className="font-bold text-sm lg:text-2xl">
              Pharmacy Request
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
                {loading ? (
                  <SkeletonLoading />
                ) : Array.isArray(requestData) && requestData.length > 0 ? (
                  requestData.map((pharma) => (
                    <div
                      key={pharma.id}
                      className="border border-primary shadow-md p-3 rounded-md"
                    >
                      <div className="p-1 space-y-1">
                        <p className="text-sm lg:text-lg">
                          <span className="font-semibold">Pharmacy Name: </span>
                          {pharma.name || "N/A"}
                        </p>
                        <p className="text-sm lg:text-md">
                          <span className="font-semibold">Owner: </span>
                          Dr. {pharma.users?.first_name}{" "}
                          {pharma.users?.middle_name
                            ? `${pharma.users.middle_name.charAt(0)}. `
                            : ""}
                          {pharma.users?.last_name || ""}
                        </p>
                        <p className="text-sm lg:text-md">
                          <span className="font-semibold">
                            Date Requested:{" "}
                          </span>
                          {pharma.created_at
                            ? new Date(pharma.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Link to={`/pharmacy-request-form/${pharma.id}`}>
                          <Button
                            variant="secondary"
                            className="border border-primary"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-center text-gray-500">
                    No pharmacy request found.
                  </p>
                )}
              </div>
            </CardContent>
            {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PharmacyRequest;
