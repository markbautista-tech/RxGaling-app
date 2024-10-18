import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import
{
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import
{
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import
{
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { doctorSchedule } from '../../../Manager/schema'
import EditBtn from "../Buttons/EditBtn";
import Days from '../../../../hook/Days'
import _ from 'lodash'
const DoctorSchedule = () =>
{
  const [ selectedDay, setSelectedDay ] = useState([]);
  const [ date, setDate ] = useState()
  // const days = useRef(Days)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchedule),
  });
  const handleDaySelect = async (day) =>
  {
    let daySelect = selectedDay;

    const checkDayExist = _.findIndex(selectedDay, function (savedDay) { return savedDay === day })
    if (checkDayExist !== -1)
    {
      _.remove(daySelect, function (savedDay) { return savedDay === day })
    }
    else daySelect.push(day)
    await setSelectedDay(daySelect)
    setValue('days', daySelect)
  }
  const onSubmit = (data) =>
  {
    try
    {

      console.log(getValues());
    } catch (error)
    {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outlined" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>

            </Button>
          </DialogTrigger>
          <DialogContent className="w-4/5">
            <DialogHeader>
              <DialogTitle>Check in or Check out Form</DialogTitle>
            </DialogHeader>
            <div className="">
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="id" />
                  <label
                    htmlFor="in"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    In
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="out" size="lg" />
                  <label
                    htmlFor="out"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Out
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter className="justify-end">
              <Button type="submit" onClick={onSubmit}>
                Submit
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>

    </>
  )
}

export default DoctorSchedule;