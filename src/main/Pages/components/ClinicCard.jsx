import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ClinicCard = ({ logo, name, patients, appointments, desc }) => {
  return (
    <Card className="w-full hover:bg-primary/50">
      <CardHeader className=" flex justify-center">
        <CardTitle className="text-xl">
          <div className="lg:flex justify-center items-center gap-4 p-2 lg:p-0">
            <img src={logo} alt="" className="w-20 h-20" />
            <div className="hidden lg:block">{name}</div>
          </div>
        </CardTitle>
        <CardDescription className="lg:ps-3 text-center lg:text-right lg:text-md">
          {desc}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ClinicCard;
