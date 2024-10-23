import {
  declineRequest,
  acceptRequest,
} from "@/utils/data/update/updateRequest";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateClinicStatus = () => {
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);

  const isDecline = () => {
    setIsDeclineDialogOpen(true);
  };

  const isAccept = () => {
    setIsAcceptDialogOpen(true);
  };

  const declineClinicRequest = async (ownerId) => {
    const response = await declineRequest(ownerId);

    if (response === "success") {
      //toast for success update
      console.log("Success declining clinic request.");
    } else {
      //toast error
      console.log("Error declinining clinic request.");
    }
  };

  const acceptClinicRequest = async (ownerId) => {
    const response = await acceptRequest(ownerId);

    if (response === "success") {
      //toast for success update
      console.log("Success accepting clinic request.");
    } else {
      //toast error
      console.log("Error accepting clinic request.");
    }
  };

  return {
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
