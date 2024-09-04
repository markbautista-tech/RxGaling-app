import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";

export default function Calendar({ hide }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const handleDateClick = (date) => {
    setSelectedDate(new Date(currentYear, currentMonth, date));
  };

  return (
    <>
      <div className="bg-gray-500">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] p-6 bg-primary-foreground shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(new Date(currentYear, currentMonth, 1))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousMonth}
                className="rounded-full"
              >
                <TbChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="rounded-full"
              >
                <TbChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }, (_, i) => i + 1).map(
              (day) => (
                <div key={`empty-${day}`} className="text-center text-sm" />
              )
            )}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`rounded-full text-center text-sm transition-colors hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
