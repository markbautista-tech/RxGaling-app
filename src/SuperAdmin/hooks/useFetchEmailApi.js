import Appreciation from "@/emails/Appreciation";
import DeclineClinicRequest from "@/emails/DeclineClinicRequest";
import React from "react";
import ReactDOMServer from "react-dom/server";

const useFetchEmailApi = () => {
  const sendEmailDecline = async () => {
    const emailHtml = ReactDOMServer.renderToString(DeclineClinicRequest());
    try {
      const response = await fetch("/api/send-decline-clinic-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "rxgaling@gmail.com",
          subject: "Clinic Registration Status",
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send email:", response.status, errorText);
        alert("Failed to send email.");
        return;
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Email sent successfully:", data);
        alert("Email sent successfully!");
      } else {
        console.warn("Response is not JSON:", await response.text());
        alert("Response received, but not JSON format");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  const sendAppreciation = async ({ email, reg_number }) => {
    const emailHtml = ReactDOMServer.renderToString(Appreciation(reg_number));
    try {
      const response = await fetch("/api/send-decline-clinic-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Clinic Registration Status",
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send email:", response.status, errorText);
        alert("Failed to send email.");
        return;
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Email sent successfully:", data);
        alert("Email sent successfully!");
      } else {
        console.warn("Response is not JSON:", await response.text());
        alert("Response received, but not JSON format");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return {
    sendEmailDecline,
    sendAppreciation,
  };
};

export default useFetchEmailApi;
