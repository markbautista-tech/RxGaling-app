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
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-4/5">
            <DialogHeader>
              <DialogTitle>Clinic Doctor Form</DialogTitle>
            </DialogHeader>
            <div className="">
              <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
                Clinic Doctor Management
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Days.map((day, index) =>
                {
                  return (
                    <>
                      <div className="flex items-center space-x-2">
                        <Checkbox id={index} value={index} onCheckedChange={() => handleDaySelect(index)} />
                        <label
                          htmlFor={index}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </label>
                      </div>
                    </>
                  )
                })}
              </div>
              <div className="">
                  <Label>Time</Label>
                  <Input
                    {...register("hours")}
                    placeholder=""
                    type="time"
                  />
                  {errors.hours && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.hours.message}
                    </p>
                  )}
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