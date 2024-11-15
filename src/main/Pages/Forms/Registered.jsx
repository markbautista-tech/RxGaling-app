import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Registered = () => {
  const handleClick = () => {
    window.open("https://mail.google.com/mail/", "_blank");
  };
  return (
    <>
      <div className="w-screen h-screen bg-gray-200 flex-center-all">
        <Card className="shadow-md lg:p-3">
          <CardHeader className="text-center">
            <CardTitle>Thank You for Signing-up!</CardTitle>
            <CardTitle>
              Welcome to{" "}
              <span className="font-bold text-primary">RxGaling</span>!
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>Check your email to confirm your signup.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleClick}>
              <FaEnvelopeOpenText />
              Open Gmail
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Registered;
