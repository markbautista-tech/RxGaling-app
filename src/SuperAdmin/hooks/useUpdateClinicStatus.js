import {
  declineRequest,
  acceptRequest,
  archive,
} from "@/utils/data/update/updateRequest";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Welcome from "@/emails/Welcome";
import ReactDOMServer from "react-dom/server";
import useFetchEmailApi from "./useFetchEmailApi";
import { toast } from "sonner";

const useUpdateClinicStatus = () => {
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const { sendEmailDecline, sendEmailAccept } = useFetchEmailApi();

  const isDecline = async () => {
    setIsDeclineDialogOpen(true);
  };

  const isAccept = () => {
    setIsAcceptDialogOpen(true);
  };

  const declineClinicRequest = async (ownerId, name, clinicName, email) => {
    sendEmailDecline(name, clinicName, email);
    const response = await declineRequest(ownerId);

    if (response === "success") {
      //toast for success update
      // console.log("Success declining clinic request.");
      toast("Clinic registration request declined.");
    } else {
      //toast error
      // console.log("Error declinining clinic request.");
      toast.error("Error declinining clinic request.");
    }
  };

  const acceptClinicRequest = async (ownerId, name, clinicName, email) => {
    sendEmailAccept(name, clinicName, email);
    const response = await acceptRequest(ownerId);

    if (response === "success") {
      //toast for success update
      // console.log("Success accepting clinic request.");
      toast.success("Clinic registration request accepted");
    } else {
      //toast error
      toast.error("Error accepting clinic request.");
    }
  };

  const updateArchive = async (ownerId) => {
    const response = await archive(ownerId);
    if (response === "Archived") {
      toast.success("Clinic request archived");
    } else {
      toast.error("Error archiving clinic request");
    }
  };

  return {
    updateArchive,
    declineClinicRequest,
    acceptClinicRequest,
    isDecline,
    isAccept,
    isDeclineDialogOpen,
    setIsDeclineDialogOpen,
    isAcceptDialogOpen,
    setIsAcceptDialogOpen,
  };
};

export default useUpdateClinicStatus;
