import React, { useState } from "react";
import useFetchEmailApi from "./useFetchEmailApi";
import {
  acceptPharmacyRequest,
  declinePharmacyRequest,
} from "@/utils/data/update/updateRequest";
import { toast } from "sonner";

const useUpdatePharmacyStatus = () => {
  const { sendEmailPharmAccept, sendEmailPharmDecline } = useFetchEmailApi();
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDecline = async () => {
    setIsDeclineDialogOpen(true);
  };

  const isAccept = () => {
    setIsAcceptDialogOpen(true);
  };

  const handleDecline = async (id, name, email, pharmName) => {
    const response = await declinePharmacyRequest(id);
    sendEmailPharmDecline(name, pharmName, email);

    if (response === "success") {
      toast("Pharmacy registration request declined.");
    } else {
      toast.error("Error declinining Pharmacy request.");
    }
  };

  const handleAccept = async (id, name, email, pharmName) => {
    const response = await acceptPharmacyRequest(id);
    sendEmailPharmAccept(name, pharmName, email);

    if (response === "success") {
      toast("Pharmacy registration request Accepted.");
    } else {
      toast.error("Error accepting Pharmacy request.");
    }
  };

  return {
    isDecline,
    isAccept,
    isDeclineDialogOpen,
    setIsDeclineDialogOpen,
    isAcceptDialogOpen,
    setIsAcceptDialogOpen,
    handleDecline,
    handleAccept,
  };
};

export default useUpdatePharmacyStatus;
