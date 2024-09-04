import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { TbArrowRight } from "react-icons/tb";

import { Link, useLocation } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="flex-center-all w-screen h-screen ">
        <div className="space-y-5">
          <div className="flex justify-center">
            <img src="src/assets/logo 2.png" alt="" width="100" />
          </div>
          <div className="text-center ">
            <h2 className="font-semibold text-2xl">Welcome to the</h2>
            <h1 className="font-bold text-primary text-3xl drop-shadow-lg">
              RXGALING
            </h1>
          </div>
          <p className="text-wrap text-center">
            A simple prescription and pharmacy management system.
          </p>
          <Separator variant="horizontal" className="bg-gray-300" />
          <div className="flex justify-center items-center gap-3">
            Continue to login
            <Link to="/login">
              <Button>
                <TbArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
