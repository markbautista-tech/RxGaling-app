import InviteUserClinic from "@/emails/InviteUserClinic";
import React from "react";
import ReactDOMServer from "react-dom/server";

const useEmailApi = () => {
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
        console.error("Failed to send email:", response.status, errorText);

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

  return {
    sendInvite,
  };
};

export default useEmailApi;
