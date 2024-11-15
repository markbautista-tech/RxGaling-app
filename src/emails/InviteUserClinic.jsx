import { Button, Html, Tailwind, Text } from "@react-email/components";
import * as React from "react";

export default function InviteUserClinic({ url, role }) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-100 p-8 rounded-lg">
          <h1 className="text-2xl font-bold">You have been Invited!</h1>
          <Text className="text-gray-700 mt-4 font-sans">
            To <span className="font-bold">[Clinic's Name]</span> as{" "}
            <span className="font-bold">{role}</span>
          </Text>
          <Text className="text-gray-700 mt-4 font-sans">
            To get started, please register and create your account using the
            link below:
          </Text>
          <a href={url} className="text-primary font-semibold">
            Registration Link
          </a>
        </div>
      </Tailwind>
    </Html>
  );
}
