import {
  declineRequest,
  acceptRequest,
} from "@/utils/data/update/updateRequest";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Welcome from "@/emails/Welcome";
import ReactDOMServer from "react-dom/server";
import useFetchEmailApi from "./useFetchEmailApi";

const useUpdateClinicStatus = () => {
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const { sendEmailDecline } = useFetchEmailApi();

  // const sendEmail = async () => {
  //   const resend_api = import.meta.env.VITE_RESEND_RXGALING_API_KEY;
  //   console.log(resend_api);
  //   try {
  //     const res = await fetch("https://api.resend.com/emails", {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: {
  //         Authorization: `Bearer ${resend_api}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         from: "Acme <onboarding@resend.dev>",
  //         to: "bautistamark087@gmail.com",
  //         subject: "hello world",
  //         html: "<strong>it works!</strong>",
  //       }),
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log("Email sent successfully:", data);
  //       alert("Email sent successfully!");
  //     } else {
  //       console.error("Failed to send email:", res.status, await res.text());
  //       alert("Failed to send email.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred.");
  //   }
  // };

  // const sendEmail = async () => {
  //   const emailHtml = ReactDOMServer.renderToString(Welcome());
  //   try {
  //     const response = await fetch("/api/send-email", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         to: "bautistamark087@gmail.com",
  //         subject: "hello world",
  //         html: emailHtml,
  //         // react: Welcome(),
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text(); // Use .text() for more flexibility
  //       console.error("Failed to send email:", response.status, errorText);
  //       alert("Failed to send email.");
  //       return;
  //     }

  //     // Check if response has content
  //     const contentType = response.headers.get("content-type");
  //     if (contentType && contentType.includes("application/json")) {
  //       const data = await response.json();
  //       console.log("Email sent successfully:", data);
  //       alert("Email sent successfully!");
  //     } else {
  //       console.warn("Response is not JSON:", await response.text());
  //       alert("Response received, but not JSON format");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred.");
  //   }
  // };

  const isDecline = async () => {
    // setIsDeclineDialogOpen(true);
    sendEmailDecline();
    // sendEmail();
    // try {
    //   const response = await fetch("/api/mail", { method: "POST" });
    //   console.log(response);
    //   if (response.ok) {
    //     console.log("Email sent successfully");
    //   } else {
    //     console.error("Failed to send email");
    //   }
    // } catch (error) {
    //   console.error("Error during fetch:", error);
    // }
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
