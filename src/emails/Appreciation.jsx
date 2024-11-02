import { Button, Html, Tailwind } from "@react-email/components";
import * as React from "react";

export default function Appreciation({ registration_number }) {
  return (
    <Html>
      <Tailwind>
        <div className="h-screen flex-center-all px-5 bg-gray-200">
          <div className="p-10 space-y-5 border rounded-lg shadow-md bg-white">
            <div className="flex-center-all">
              <img src="src/assets/logo.svg" alt="" className="w-20 h-20" />
            </div>
            <h1 className="text-center font-bold text-2xl text-green-700">
              CONGRATULATIONS!
            </h1>

            {/* <div className="flex-center-all">
            <FcAcceptDatabase className="w-24 h-24" />
          </div> */}
            <div>
              <p className="font-semibold text-lg text-center">
                Thank you for registering in our app! We’re excited to have you
                on board.
              </p>
            </div>
            <div className="p-7">
              <p className="text-sm text-center font-semibold">
                Registration Number:
              </p>
              <p className="text-2xl text-center font-bold">
                {registration_number}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-center">
                Please allow us 1-2 working days to review and approve your
                registration. Once your account is approved, you’ll receive a
                confirmation email with the next steps.
              </p>
            </div>
            <div className="pt-10">
              <p className="text-center text-gray-500 text-sm">
                &copy; RxGaling 2024
              </p>
            </div>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
