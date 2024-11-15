import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useClinicDetails from "../hooks/useClinicDetails";
import { Button } from "@/components/ui/button";
import Welcome from "../../emails/Welcome";

import { render } from "@react-email/components";
import postmark from "postmark";
import Plunk from "@plunk/node";
import { Resend } from "resend";
import { declineRequest } from "@/utils/data/update/updateRequest";
import useUpdateClinicStatus from "../hooks/useUpdateClinicStatus";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DisplayRequestForm = () => {
  const navigate = useNavigate();
  const {
    clinicReq,
    clinicData,
    requestDate,
    getOwnerFirstName,
    getOwnerMiddleName,
    getOwnerLastName,
    getOwnerExtName,
    getOwnerGender,
    getOwnerNumber,
    getOwnerEmail,
    getOwnerRegion,
    getOwnerProvince,
    getOwnerCityMuni,
    getOwnerBarangay,
    getOwnerAddAddress,
    getClinicName,
    getClinicID,
    getClinicRegion,
    getClinicProvince,
    getClinicCityMuni,
    getClinicBarangay,
    getClinicAddAddress,
    getOwnerUID,
    getPermit,
    getBIR,
    getPic,
    regNumber,
  } = useClinicDetails();

  const {
    declineClinicRequest,
    acceptClinicRequest,
    isDecline,
    isAccept,
    isDeclineDialogOpen,
    setIsDeclineDialogOpen,
    isAcceptDialogOpen,
    setIsAcceptDialogOpen,
  } = useUpdateClinicStatus();

  const { id } = useParams();

  const clinicID = getClinicID(id);
  const ownerUID = getOwnerUID(id);

  const permitURL = getPermit(ownerUID);
  const birURL = getBIR(ownerUID);
  const picURL = getPic(ownerUID);

  const handlePermit = () => {
    window.open(permitURL, "_blank");
  };

  const handleBIR = () => {
    window.open(birURL, "_blank");
  };

  const handlePic = () => {
    window.open(picURL, "_blank");
  };

  const name = getOwnerLastName(id);
  const clinicName = getClinicName(id);
  const email = getOwnerEmail(id);
  const reg_num = regNumber(id);

  return (
    <>
      <div className="no-scrollbar px-5 lg:px-14 bg-gray-100">
        <div className="w-full flex items-center gap-5 p-5 lg:p-10">
          <div>
            <Link to="/admin">
              <IoMdArrowRoundBack className="w-6 h-6 cursor-pointer" />
            </Link>
          </div>
          <span className="font-bold text-lg lg:text-2xl text-center">
            Clinic Request Form
          </span>
        </div>
        <div className="p-5 lg:px-10 border-2 rounded-md shadow-md bg-white">
          <div className=" no-scrollbar w-full space-y-2">
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <p className="font-bold text-md lg:text-xl">
                Clinic Owner Details
              </p>
            </div>
            <div className="flex lg:justify-end">
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-7">
                <p className="text-sm lg:text-md">
                  <span className="font-semibold">Date Requested: </span>
                  {new Date(requestDate(id)).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm lg:text-md">
                  <span className="font-semibold">Registration Number: </span>
                  {reg_num}
                </p>
              </div>
            </div>
            <div className="lg:flex gap-3 items-start">
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div className="">
                  <Label htmlFor="fname">First Name</Label>
                  <Input type="text" readOnly value={getOwnerFirstName(id)} />
                </div>
                <div>
                  <Label htmlFor="mname">Middle Name</Label>
                  <Input type="text" readOnly value={getOwnerMiddleName(id)} />
                </div>
                <div>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input type="text" readOnly value={getOwnerLastName(id)} />
                </div>
              </div>
              <div className="">
                <Label htmlFor="ename">Ext. Name</Label>
                <Input type="text" readOnly value={getOwnerExtName(id)} />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="gender">Gender</Label>
                <Input type="text" readOnly value={getOwnerGender(id)} />
              </div>
              <div className="">
                <Label htmlFor="number">Mobile Number</Label>
                <Input type="text" readOnly value={getOwnerNumber(id)} />
              </div>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input type="text" readOnly value={getOwnerEmail(id)} />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="region">Region</Label>
                <Input type="text" readOnly value={getOwnerRegion(id)} />
              </div>
              <div className="">
                <Label htmlFor="province">Province</Label>
                <Input type="text" readOnly value={getOwnerProvince(id)} />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="city">City/Municipality</Label>
                <Input type="text" readOnly value={getOwnerCityMuni(id)} />
              </div>
              <div className="">
                <Label htmlFor="barangay">Barangay</Label>
                <Input type="text" readOnly value={getOwnerBarangay(id)} />
              </div>
            </div>
            <div className="">
              <Label htmlFor="add_address">Additional Address</Label>
              <Input type="text" readOnly value={getOwnerAddAddress(id)} />
            </div>
            <div className="py-5 px-3">
              <Separator orientation="horizontal" className="" />
            </div>
            <p className="font-bold text-md lg:text-xl">Clinic Details</p>
            <div className="">
              <Label htmlFor="clinic">Clinic Name</Label>
              <Input type="text" readOnly value={getClinicName(id)} />
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="region">Region</Label>
                <Input type="text" readOnly value={getClinicRegion(clinicID)} />
              </div>
              <div className="">
                <Label htmlFor="province">Province</Label>
                <Input
                  type="text"
                  readOnly
                  value={getClinicProvince(clinicID)}
                />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="city">City/Municipality</Label>
                <Input
                  type="text"
                  readOnly
                  value={getClinicCityMuni(clinicID)}
                />
              </div>
              <div className="">
                <Label htmlFor="barangay">Barangay</Label>
                <Input
                  type="text"
                  readOnly
                  value={getClinicBarangay(clinicID)}
                />
              </div>
            </div>
            <div className="">
              <Label htmlFor="add_address">Additional Address</Label>
              <Input
                type="text"
                readOnly
                value={getClinicAddAddress(clinicID)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Label>Mayor's Permit</Label>
                <Button
                  className="bg-primary/50 lg:w-[150px] shadow-md"
                  onClick={handlePermit}
                >
                  View Mayor's Permit
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <Label>BIR</Label>
                <Button
                  className="bg-primary/50 lg:w-[150px] shadow-md"
                  onClick={handleBIR}
                >
                  View BIR
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Clinic Picture</Label>
                <Button
                  className="bg-primary/50 lg:w-[150px] shadow-md"
                  onClick={handlePic}
                >
                  View Clinic Picture
                </Button>
              </div>
            </div>
          </div>
          <div className="py-5 px-3">
            <Separator orientation="horizontal" className="" />
          </div>

          <div className="grid grid-flow-row gap-5 lg:grid-flow-col w-full pb-3 pt-">
            <Button
              variant="destructive"
              onClick={() => {
                isDecline();
              }}
              className="lg:text-lg shadow-md hover:scale-105 transition-all"
            >
              Decline Request
            </Button>
            <Button
              onClick={() => {
                isAccept();
              }}
              className="lg:text-lg shadow-md hover:scale-105 transition-all"
            >
              Accept Request
            </Button>

            <AlertDialog
              open={isDeclineDialogOpen}
              onOpenChange={setIsDeclineDialogOpen}
            >
              {/* <AlertDialogTrigger asChild>
                  <Button
                    type="submit"

                    className="w-full lg:w-32"
                    disabled={!termsAccepted}
                  >
                    Register
                  </Button>
                </AlertDialogTrigger> */}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure declining {getClinicName(id)}'s request?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex gap-3">
                    This action cannot be undone. This will decline the clinic
                    request to access account to the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      declineClinicRequest(
                        id,
                        name,
                        clinicName,
                        email,
                        reg_num
                      ) && navigate("/admin/clinic-page");
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog
              open={isAcceptDialogOpen}
              onOpenChange={setIsAcceptDialogOpen}
            >
              {/* <AlertDialogTrigger asChild>
                  <Button
                    type="submit"

                    className="w-full lg:w-32"
                    disabled={!termsAccepted}
                  >
                    Register
                  </Button>
                </AlertDialogTrigger> */}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirm accepting {getClinicName(id)}'s request?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex gap-3">
                    This action confirms the clinic request to be accepted to
                    have an account in the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      acceptClinicRequest(
                        id,
                        name,
                        clinicName,
                        email,
                        reg_num
                      ) && navigate("/admin/clinic-page");
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayRequestForm;
