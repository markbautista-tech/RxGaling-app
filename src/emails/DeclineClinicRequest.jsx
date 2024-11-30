import { Button, Html, Tailwind, Text } from "@react-email/components";
import * as React from "react";

export default function DeclineClinicRequest({ name, clinicName }) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-100 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-red-600">
            Registration Update
          </h1>
          <Text className="text-gray-700 mt-4 font-sans">Dear Dr. {name},</Text>
          <Text className="text-gray-700 mt-4 font-sans">
            Thank you for your interest in registering <b>{clinicName}</b> with
            us. We appreciate the time and effort you have taken to submit your
            application.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            After careful review, we regret to inform you that we are unable to
            proceed with your registration at this time. This decision was made
            based on current registration requirements. Please be assured that
            this outcome is not a reflection of the quality of your clinic but
            rather the alignment with our current criteria.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            We encourage you to review our registration guidelines, and you are
            welcome to reapply if your circumstances change. If you have any
            questions or need clarification on this decision, please feel free
            to reach out.
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            Thank you once again for considering us. We wish you and your clinic
            continued success.
          </Text>

          <Text className="text-gray-600 mt-4 font-sans">
            If you have any questions, feel free to reach out to our support
            team.
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
