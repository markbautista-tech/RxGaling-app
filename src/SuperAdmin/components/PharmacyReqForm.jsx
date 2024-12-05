import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PharmacyReqAddForm from "./PharmacyReqAddForm";
import usePharmacyDetails from "@/PharmacyApp/hooks/usePharmacyDetails";
import LoadingUI from "@/main/components/loadingUI";
import useUpdatePharmacyStatus from "../hooks/useUpdatePharmacyStatus";

const getRegionName = async (regionId) => {
  try {
    const response = await fetch(`https://psgc.cloud/api/regions/${regionId}`);
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProvinceName = async (provinceId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/provinces/${provinceId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCityMuniName = async (cityMuniId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/cities-municipalities/${cityMuniId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBarangayName = async (barangayId) => {
  try {
    const response = await fetch(
      `https://psgc.cloud/api/barangays/${barangayId}`
    );
    const data = await response.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const PharmacyReqForm = () => {
  const navigate = useNavigate();
  const { requestData, loading } = usePharmacyDetails();
  const {
    isDecline,
    isAccept,
    isDeclineDialogOpen,
    setIsDeclineDialogOpen,
    isAcceptDialogOpen,
    setIsAcceptDialogOpen,
    handleAccept,
    handleDecline,
  } = useUpdatePharmacyStatus();
  const [reqDetails, setReqDetails] = useState({});
  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [cityMuni, setCityMuni] = useState(null);
  const [barangay, setBarangay] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id && Array.isArray(requestData)) {
      const selectedPharmacy = requestData.find(
        (pharm) => pharm.id === Number(id)
      );
      setReqDetails(selectedPharmacy);
    }
  }, [id, requestData]);

  useEffect(() => {
    const fetchAddress = async () => {
      const bar = await getBarangayName(reqDetails.addresses?.barangay);
      const cityMuni = await getCityMuniName(reqDetails.addresses?.city);
      const province = await getProvinceName(reqDetails.addresses?.province);
      const region = await getRegionName(reqDetails.addresses?.region);
      setRegion(region);
      setProvince(province);
      setCityMuni(cityMuni);
      setBarangay(bar);
    };
    fetchAddress();
  }, []);

  const handleFDA = () => {
    window.open(reqDetails.fda_license_url, "_blank");
  };

  const handlePic = () => {
    window.open(reqDetails.site_pic_url, "_blank");
  };

  if (loading) return <LoadingUI />;

  if (!reqDetails)
    return (
      <p className="text-lg text-center text-gray-500">
        Pharmacy request not found.
      </p>
    );

  return (
    <>
      <div className="no-scrollbar px-5 lg:px-14 bg-gray-100">
        <div className="w-full flex items-center gap-5 p-5 lg:p-10">
          <div>
            <Link to="/admin/pharmacy-page">
              <IoMdArrowRoundBack className="w-6 h-6 cursor-pointer" />
            </Link>
          </div>
          <span className="font-bold text-lg lg:text-2xl text-center">
            Pharmacy Request Form
          </span>
        </div>
        <div className="p-5 lg:px-10 border-2 rounded-md shadow-md bg-white">
          <div className=" no-scrollbar w-full space-y-2">
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <p className="font-bold text-md lg:text-xl">
                Pharmacy Owner Details
              </p>
            </div>
            <div className="flex lg:justify-end">
              <div className="flex flex-col gap-2 lg:flex-row lg:gap-7">
                <p className="text-sm lg:text-md">
                  <span className="font-semibold">Date Requested: </span>
                </p>
              </div>
            </div>
            <div className="lg:flex gap-3 items-start">
              <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                <div className="">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    type="text"
                    readOnly
                    value={reqDetails.users?.first_name || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="mname">Middle Name</Label>
                  <Input
                    type="text"
                    readOnly
                    value={reqDetails.users?.middle_name || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    type="text"
                    readOnly
                    value={reqDetails.users?.last_name || ""}
                  />
                </div>
              </div>
              <div className="">
                <Label htmlFor="ename">Ext. Name</Label>
                <Input
                  type="text"
                  readOnly
                  value={reqDetails.users?.suffix || ""}
                />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  type="text"
                  readOnly
                  value={reqDetails.users?.gender || ""}
                />
              </div>
              <div className="">
                <Label htmlFor="number">Mobile Number</Label>
                <Input
                  type="text"
                  readOnly
                  value={reqDetails.users?.mobile_number || ""}
                />
              </div>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  readOnly
                  value={reqDetails.users?.email || ""}
                />
              </div>
              <div className="">
                <Label htmlFor="email">Birthdate</Label>
                <Input
                  type="text"
                  readOnly
                  value={
                    `${new Date(reqDetails.users?.birthdate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}` || ""
                  }
                />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="region">Region</Label>
                <Input type="text" readOnly value={region} />
              </div>
              <div className="">
                <Label htmlFor="province">Province</Label>
                <Input type="text" readOnly value={province} />
              </div>
            </div>
            <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
              <div className="">
                <Label htmlFor="city">City/Municipality</Label>
                <Input type="text" readOnly value={cityMuni} />
              </div>
              <div className="">
                <Label htmlFor="barangay">Barangay</Label>
                <Input type="text" readOnly value={barangay} />
              </div>
            </div>
            <div className="">
              <Label htmlFor="add_address">Additional Address</Label>
              <Input
                type="text"
                readOnly
                value={reqDetails.users?.addresses?.address_line}
              />
            </div>
            <div className="py-5 px-3">
              <Separator orientation="horizontal" className="" />
            </div>
            <div>
              <PharmacyReqAddForm data={reqDetails} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Label>FDA License</Label>
                <Button
                  className="bg-primary/50 lg:w-[170px] shadow-md"
                  onClick={handleFDA}
                >
                  View FDA License
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Pharmacy Picture</Label>
                <Button
                  className="bg-primary/50 lg:w-[170px] shadow-md"
                  onClick={handlePic}
                >
                  View Pharmacy Picture
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
              className="lg:text-lg shadow-md hover:scale-105 transition-all"
              onClick={isDecline}
            >
              Decline Request
            </Button>
            <Button
              className="lg:text-lg shadow-md hover:scale-105 transition-all"
              onClick={isAccept}
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
                    Are you sure declining{" "}
                    <span className="text-red-600">{reqDetails.name}</span>'s
                    request?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex gap-3">
                    This action cannot be undone. This will decline the Pharmacy
                    request to access account to the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="hover:bg-red-500"
                    onClick={() => {
                      handleDecline(
                        id,
                        reqDetails.users?.last_name,
                        reqDetails.users?.email,
                        reqDetails.name
                      ) && navigate("/admin/pharmacy-page");
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
                    Confirm accepting{" "}
                    <span className="text-green-600">{reqDetails.name}</span>'s
                    request?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="flex gap-3">
                    This action confirms the pharmacy request to be accepted to
                    have an account in the system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="hover:bg-green-500"
                    onClick={() => {
                      handleAccept(
                        id,
                        reqDetails.users?.last_name,
                        reqDetails.users?.email,
                        reqDetails.name
                      ) && navigate("/admin/pharmacy-page");
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

export default PharmacyReqForm;
