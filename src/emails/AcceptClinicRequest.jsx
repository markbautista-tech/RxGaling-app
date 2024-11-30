import { Button, Html, Tailwind, Text } from "@react-email/components";
import * as React from "react";

export default function AcceptClinicRequest({ name, clinicName }) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-100 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-green-600">
            Registration Update
          </h1>
          <Text className="text-gray-700 mt-4 font-sans">Dear Dr. {name},</Text>
          <Text className="text-gray-700 mt-4 font-sans">
            <b>CONGRATULATIONS!</b> We’re pleased to inform you that your
            registration for <b>{clinicName}</b> has been successfully approved.
            We are excited to have you join our platform and look forward to
            supporting your clinic's growth and success.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            To get started, please sign-in to create your account using the link
            below:
          </Text>
          <a href="http://localhost:3000/sign-up" className="text-primary">
            Sign-Up Link
          </a>
          <Text className="text-gray-700 mt-4 font-sans font-bold">
            Next Steps:
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            1. Sign-in using the credentials you created during registration and
            keep it private for security.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            2. Complete your clinic profile to provide more details for your
            clients.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            3. Explore our platform to discover tools and resources designed to
            help you manage and grow your clinic effectively.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            If you have any questions or need assistance, don’t hesitate to
            contact our support team.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans italic font-bold">
            Note: You can use the Clinic's email for signing up.
          </Text>

          <Text className="text-gray-600 mt-4 font-sans">
            Best regards,
            <br />
            <span className="text-md font-bold">RXGALING</span>
            <br />
            System Provider
          </Text>
        </div>
      </Tailwind>
    </Html>
  );
}
