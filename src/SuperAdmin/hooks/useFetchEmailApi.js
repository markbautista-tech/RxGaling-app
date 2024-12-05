import AcceptClinicRequest from "@/emails/AcceptClinicRequest";
import AcceptPharmaReq from "@/emails/AcceptPharmaReq";
import Appreciation from "@/emails/Appreciation";
import DeclineClinicRequest from "@/emails/DeclineClinicRequest";
import DeclinePharmaRequest from "@/emails/DeclinePharmaRequest";
import React from "react";
import ReactDOMServer from "react-dom/server";

const useFetchEmailApi = () => {
  const sendEmailDecline = async (name, clinicName, email, reg_num) => {
    const emailHtml = ReactDOMServer.renderToString(
      DeclineClinicRequest({ name, clinicName, reg_num })
    );
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
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendEmailAccept = async (name, clinicName, email, reg_num) => {
    const emailHtml = ReactDOMServer.renderToString(
      AcceptClinicRequest({ name, clinicName, reg_num })
    );
    try {
      const response = await fetch("/api/send-accept-clinic-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Clinic Registration Approved – Welcome to RXGALING!",
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
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendAppreciation = async (email) => {
    const emailHtml = ReactDOMServer.renderToString(Appreciation());
    try {
      const response = await fetch("/api/send-appreciation", {
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

        return;
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Email sent successfully:", data);
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendPharmacyAppreciation = async (email) => {
    const emailHtml = ReactDOMServer.renderToString(Appreciation());
    try {
      const response = await fetch("/api/send-appreciation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Pharmacy Registration Status",
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send email:", response.status, errorText);

        return;
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Email sent successfully:", data);
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendEmailPharmAccept = async (name, clinicName, email) => {
    const emailHtml = ReactDOMServer.renderToString(
      AcceptPharmaReq({ name, clinicName })
    );
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Pharmacy Registration Approved – Welcome to RXGALING!",
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
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const sendEmailPharmDecline = async (name, pharmaName, email) => {
    const emailHtml = ReactDOMServer.renderToString(
      DeclinePharmaRequest({ name, pharmaName })
    );
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Pharmacy Registration Status",
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
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    sendEmailDecline,
    sendAppreciation,
    sendEmailAccept,
    sendPharmacyAppreciation,
    sendEmailPharmAccept,
    sendEmailPharmDecline,
  };
};

export default useFetchEmailApi;
