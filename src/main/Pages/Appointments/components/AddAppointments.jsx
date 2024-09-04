import React, { useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SearchBar from "../../components/Search";
import { PickDate } from "../../components/PickDate";
import DoctorCard from "../../components/DoctorCard";

const doctorData = [
  {
    profile: "/src/assets/acculife logo.svg",
    name: "Dr. Casem",
    specialty: "Internal Medicine",
  },
];

const AddAppointments = ({ trigger }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-full lg:max-w-[700px] p-3 lg:p-5 rounded-md">
          <DialogHeader>
            <DialogTitle className="text-md lg:text-xl">
              Add New Appointments
            </DialogTitle>
            <DialogDescription className="lg:text-md">
              Select if patient wants to appoint by Date or Doctor.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="date" className="border-b">
            <TabsList className="flex w-full justify-between">
              <TabsTrigger value="date" className="w-full">
                Date
              </TabsTrigger>
              <TabsTrigger value="doctor" className="w-full">
                Doctor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="date">
              <div className="w-full flex gap-7 items-center justify-between">
                <div className="w-full">
                  <PickDate />
                </div>
                <div>
                  <SearchBar />
                </div>
              </div>
              <div className="w-full bg-black ">
                {doctorData.map((doctors, index) => {
                  <div key={index}>
                    <div className="w-full">
                      <DoctorCard
                        profile={doctors.profile}
                        name={doctors.name}
                        specialty={doctors.specialty}
                      />
                    </div>
                  </div>;
                })}
              </div>
            </TabsContent>
            <TabsContent value="doctor"></TabsContent>
          </Tabs>
          <DialogFooter className="w-full">
            <div className="flex justify-center gap-3 w-full">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
              <Button className="w-full">Next</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAppointments;
