import InviteUserClinic from "@/emails/InviteUserClinic";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";

const useEmailApi = () => {
  const [loading, setloading] = useState(false);

  const sendInvite = async (email, role, url) => {
    const emailHtml = ReactDOMServer.renderToString(
      InviteUserClinic({ url, role })
    );
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to [Clinic name]",
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send email you:", response.status, errorText);

        return;
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Email sent successfully:", data);
        return data;
      } else {
        console.warn("Response is not JSON:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendInviteNodemailer = async (email, role, url) => {
    const emailHtml = ReactDOMServer.renderToString(
      InviteUserClinic({ url, role })
    );
    setloading(true);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: email,
          subject: "Welcome to Clinic",
          htmlContent: emailHtml,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
      } else {
        console.error("Error: ", data.error);
      }

      return response;
    } catch (error) {
      console.error("Error occurred: ", error.message);
    } finally {
      setloading(false);
    }
  };

  return {
    sendInvite,
    sendInviteNodemailer,
    loading,
  };
};

export default useEmailApi;
