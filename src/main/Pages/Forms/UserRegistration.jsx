import React, { useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Birthday from "./components/Birthday";
import SelectGender from "./components/Gender";
import Address from "./components/Address";

const UserRegistration = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <>
      <div className="p-5 lg:p-10">
        <div className="py-5 lg:px-24">
          <ContentTitle title={"Registration"} />
        </div>
        <div className="lg:px-36">
          <form>
            <Card className="shadow-md">
              <CardHeader>
                {/* <CardTitle>Card Title</CardTitle> */}
                <CardDescription className="italic">
                  Please fill up all important inputs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 lg:space-y-5">
                  <div className="lg:flex gap-3 items-center">
                    <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                      <div className="">
                        <Label htmlFor="fname">First Name</Label>
                        <Input type="text" placeholder="Juan" />
                      </div>
                      <div>
                        <Label htmlFor="mname">Middle Name</Label>
                        <Input type="text" placeholder="Manansala" />
                      </div>
                      <div>
                        <Label htmlFor="lname">Last Name</Label>
                        <Input type="text" placeholder="Dela Cruz" />
                      </div>
                    </div>
                    <div className="lg:w-28">
                      <Label htmlFor="ename">Ext. Name</Label>
                      <Input type="text" placeholder="Sr Jr I II III" />
                    </div>
                  </div>
                  {/* <div className="py-3">
                    <Separator orientation="horizontal" />
                  </div> */}
                  <div>
                    <div>
                      <Label className="text-md">Birthday</Label>
                    </div>
                    <div className="lg:flex gap-3 lg:items-center">
                      <div className="flex-1 pb-3 lg:p-0">
                        <Birthday />
                      </div>
                      <div className="lg:w-32 w-full">
                        <Label>Age</Label>
                        <Input type="number" placeholder="" readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="example@gmail.com" />
                    </div>
                    <div>
                      <Label>Mobile Number</Label>
                      <Input type="number" placeholder="" />
                    </div>
                    <div className="w-full">
                      <SelectGender />
                    </div>
                  </div>

                  <div>
                    <Address />
                  </div>

                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label>License Number</Label>
                      <Input type="text" placeholder="" />
                    </div>
                    <div>
                      <Label>Specialty</Label>
                      <Input type="text" placeholder="" />
                    </div>
                  </div>

                  <div className="grid grid-flow-row gap-3 lg:grid-flow-col w-full pb-3 lg:p-0">
                    <div>
                      <Label>PTR Number</Label>
                      <Input type="text" placeholder="" />
                    </div>
                    <div>
                      <Label>S2 License Number</Label>
                      <Input type="text" placeholder="" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-flow-row w-full gap-4 lg:grid-flow-col lg:justify-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(checked) => setTermsAccepted(checked)}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <Button
                    variant="secondary"
                    className="border border-primary w-full lg:w-24"
                  >
                    Cancel
                  </Button>
                  <Button className="w-full lg:w-24" disabled={!termsAccepted}>
                    Register
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
