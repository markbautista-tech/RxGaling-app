import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import addSchedule from "@/utils/data/add/addSchedule";

const Scheduler = ({ doctor }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const generate12HourTimes = (interval = 30) => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        const amPm = hour < 12 ? "AM" : "PM";
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const time = `${hour12}:${minutes.toString().padStart(2, "0")} ${amPm}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeArray12Hour = generate12HourTimes();

  const handleSubmit = async () => {
    if (!startTime || !endTime || selectedDays.length === 0) {
      toast.error("Please select days, start time, and end time.");
      return;
    } else {
      const workingHours = `${startTime} - ${endTime}`;
      const workingDays = selectedDays.join(", ");
      const updated_at = new Date();

      const response = await addSchedule(
        workingDays,
        workingHours,
        doctor.user_id,
        updated_at
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
      }

      setSelectedDays([]);
      setStartTime("");
      setEndTime("");
    }
  };

  const handelClear = () => {
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
        <CalendarClock className="h-4 w-4" />
        <span className="text-xs lg:text-sm">Edit Schedule</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Schedule</AlertDialogTitle>
          <AlertDialogDescription className="flex gap-3"></AlertDialogDescription>
        </AlertDialogHeader>
        <Label className="font-bold">Select Days:</Label>
        <Input
          placeholder="Selected days will appear here"
          value={selectedDays.join(", ")}
          readOnly
        />
        <div className="grid grid-cols-5 gap-2 w-full border py-3 px-2 rounded-md">
          {days.map((day, index) => (
            <Toggle
              key={index}
              onClick={() => toggleDay(day)}
              className={`${
                selectedDays.includes(day) ? "bg-primary text-white" : ""
              } hover:bg-primary/20 hover:border border-primary hover:text-black`}
            >
              {day}
            </Toggle>
          ))}
        </div>
        <Label className="font-bold">Set Time:</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Start Time:</Label>
            <Select onValueChange={(value) => setStartTime(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {timeArray12Hour.map((time, index) => (
                  <SelectItem value={time} key={index}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>End Time:</Label>
            <Select onValueChange={(value) => setEndTime(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                {timeArray12Hour.map((time, index) => (
                  <SelectItem value={time} key={index}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* {error && <p className="italic text-red-500">{error}</p>} */}

        <div>
          <Button
            variant="outline"
            className="w-[100px] border-red-500 text-red-600 hover:text-red-600"
            onClick={handelClear}
          >
            Clear
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Scheduler;
