"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import usePickDate from "../hooks/usePickDate";
import useAddAppointment from "../Appointments/hooks/useAddAppointment";

export default function PickDate() {
  const { setInitialDate } = usePickDate();

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState(new Date());

  const handleDateSelect = (selectedDate) => {
    setSelected(selectedDate);
    // setInitialDate(selectedDate);
    setOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    setSelected(today);
    setDate(today);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full lg:w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? (
            format(selected, "yyyy - MM - dd")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <DayPicker
          showOutsideDays
          mode="single"
          selected={selected}
          onSelect={handleDateSelect}
        />
        <div className="text-right">
          <Button
            variant="outline"
            className="w-32 shadow-md border-blue-500"
            onClick={handleToday}
          >
            Today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
