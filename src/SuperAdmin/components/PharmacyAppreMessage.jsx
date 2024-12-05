import { Button } from "@/components/ui/button";
import React from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";

const PharmacyAppreMessage = () => {
  return (
    <>
      <div className="h-screen flex-center-all px-5 lg:px-16 bg-gray-200">
        <div className="p-10 lg:px-48 space-y-5 border rounded-lg shadow-md bg-white">
          <div className="flex-center-all">
            <img src="src/assets/logo.svg" alt="" className="w-20 h-20" />
          </div>
          <h1 className="text-center font-bold text-2xl text-green-700">
            CONGRATULATIONS!
          </h1>
          <div>
            <p className="font-semibold text-lg text-center">
              Thank you for registering in our app! We’re excited to have you on
              board.
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-center">
              Please allow us 1-2 working days to review and approve your
              registration. Once your account is approved, you’ll receive a
              confirmation email with the next steps.
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/pharmacy-registration">
              <Button className="w-44 lg:text-lg lg:w-44">
                <div className="flex-center-all gap-3 hover:gap-5">
                  <div>Continue</div>
                  <RiArrowRightDoubleLine className="w-7 h-7 text-bold" />
                </div>
              </Button>
            </Link>
          </div>
          <div className="pt-10">
            <p className="text-center text-gray-500 text-sm">
              &copy; RxGaling 2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyAppreMessage;
