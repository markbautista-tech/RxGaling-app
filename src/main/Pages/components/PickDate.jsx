import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import usePickDate from "../hooks/usePickDate";

export default function PickDate() {
  const { selected, setSelected } = usePickDate();
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (selectedDate) => {
    setSelected(selectedDate);
    setOpen(false);
  };

  const handleToday = () => {
    setSelected(new Date());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full lg:w-[280px] justify-start text-left font-normal ${
            !selected ? "text-muted-foreground" : ""
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "yyyy-MM-dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleDateSelect}
          showOutsideDays
        />
        <div className="text-right mt-2">
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
