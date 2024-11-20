import React from "react";

const sendEmail = async () => {
  try {
    const response = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: "braymark675@gmail.com",
        subject: "Hello from React",
        htmlContent: "<b>Hello world?</b>",
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
  }
};

export default sendEmail;
