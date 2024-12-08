import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AddAppointmentsAction = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="justify-start">
            Add Appointments
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <div className="flex justify-between w-full">
              {currentStep > 1 && (
                <Button
                  variant="secondary"
                  onClick={goToPreviousStep}
                  className="w-32"
                >
                  Back
                </Button>
              )}
              {currentStep <= 2 && (
                <Button
                  onClick={goToNextStep}
                  disabled={
                    currentStep === 1 &&
                    patientAppointment.length == 0 &&
                    handleSelectDoctor.length == 0
                  }
                  className="w-32"
                >
                  Next
                </Button>
              )}
            </div>
            <DialogTitle className="text-md lg:text-xl">
              Select Doctor to Consult
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Card>
              <CardHeader>
                <div className="grid grid-rows-2 lg:flex gap-5">
                  <Input
                    type="text"
                    placeholder="Search Doctor..."
                    className="text-xs lg:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select
                    onValueChange={(value) => setSelectedSpecialization(value)}
                    defaultValue="All Specializations"
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Specializations">
                        All Specializations
                      </SelectItem>
                      {specializations.map((spec, index) => (
                        <SelectItem value={spec} key={index}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-[400px] overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-2 pt-3 lg:px-20">
                  {sortedData.length > 0 ? (
                    sortedData.map((doctor, ids) => (
                      <div key={ids}>
                        <div
                          className={`shadow-md py-4 px-3 rounded-md flex flex-col cursor-pointer 
                                ${selectedDoctorId === doctor.user_id ? "bg-primary/10 border border-primary" : "bg-gray-100"}`}
                          onClick={() => handleSelectDoctor(doctor.user_id)}
                        >
                          <div className="flex flex-col lg:flex-row lg:gap-10 lg:justify-between">
                            <div>
                              <span className="font-bold">
                                {`Dr. ${doctor.users?.last_name}, ${doctor.users?.first_name} ${doctor.users?.middle_name?.[0]}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                                  "Unknown"}{" "}
                              </span>
                            </div>
                            <span>
                              {doctor.users?.doctor_details[0]
                                ?.specialization || "Not specified"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs lg:text-sm">
                              {`${doctor.working_days} | ${doctor.working_hours}`}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-green-500 border-green-500"
                            >
                              Online
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      No doctors found online today
                    </div>
                  )}
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Offline Doctors</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3 pt-3 lg:px-20">
                        {sortedNonOnlineData.length > 0 ? (
                          sortedNonOnlineData.map((doctor, ids) => (
                            <div key={ids}>
                              <div
                                className={`shadow-md py-4 px-3 rounded-md flex flex-col cursor-pointer 
                                ${selectedDoctorId === doctor.user_id ? "bg-primary/10 border border-primary" : "bg-gray-100"}`}
                                onClick={() =>
                                  handleSelectDoctor(doctor.user_id)
                                }
                              >
                                <div className="flex flex-col lg:flex-row lg:gap-10 lg:justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold">
                                      {`Dr. ${doctor.users?.last_name}, ${doctor.users?.first_name} ${doctor.users?.middle_name?.[0]}. ${doctor.users?.doctor_details[0]?.professional_extension}.` ||
                                        "Unknown"}{" "}
                                    </span>
                                  </div>
                                  <span>
                                    {doctor.users?.doctor_details[0]
                                      ?.specialization || "Not specified"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs lg:text-sm">
                                    {`${doctor.working_days} | ${doctor.working_hours}`}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="border-black"
                                  >
                                    Offline
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500">
                            No doctors found
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAppointmentsAction;
