import { useEffect, useState } from "react";
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

const schema = z.object({
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  ext_name: z.string().optional(),
  birth_date: z.date(),
  permanent_address: z.string(),
  picture: z.string().optional(),
  gov_id_picture: z.string().optional(),
  role: z.string(), // Either Clinic Manager, Clinic Secretary, Clinic Nurse, Clinic Assistant
})
const CreateClinicStaff = () =>
{
  const [ date, setDate ] = useState()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data) =>
  {
    try
    {
      console.log(data);
    } catch (error)
    {
      console.log(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Clinic Staff</Button>
          </DialogTrigger>
          <DialogContent className="w-4/5">
            <DialogHeader>
              <DialogTitle>Clinic Staff Form</DialogTitle>
            </DialogHeader>
            <div className="">
              <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
                Clinic Staff Management
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="">
                  <Label>Firstname</Label>
                  <Input
                    {...register("first_name")}
                    placeholder=""
                  />
                  {errors.first_name && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label>Middlename</Label>
                  <Input
                    {...register("middle_name")}
                    placeholder=""
                  />
                  {errors.middle_name && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.middle_name.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label>Lastname</Label>
                  <Input
                    {...register("last_name")}
                    placeholder=""
                  />
                  {errors.last_name && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label>Extension Name</Label>
                  <Input
                    {...register("ext_name")}
                    placeholder=""
                  />
                  {errors.ext_name && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.ext_name.message}
                    </p>
                  )}
                </div>

                {/* <Popover>
              <PopoverTrigger asChild>
                <div className="">

                  <Label>Birth Date</Label>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Birth date</span>}
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  {...register("birth_date")}
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}

                <div className="">
                  <Label>Birth Date</Label>
                  <Input
                    {...register("birth_date")}
                    placeholder=""
                    type="date"
                  />
                  {errors.birth_date && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.birth_date.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Label>Role to Clinic</Label>
                  <Input
                    {...register("role")}
                    placeholder=""
                  />
                  {errors.role && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label>Permanent Address</Label>
                  <Input
                    {...register("permanent_address")}
                    placeholder=""
                  />
                  {errors.permanent_address && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.permanent_address.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label>Picture</Label>
                  <Input
                    {...register("picture")}
                    placeholder=""
                    type="file"
                  />
                  {errors.picture && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.picture.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label>Government ID Picture</Label>
                  <Input
                    {...register("gov_id_picture")}
                    placeholder=""
                    type="file"
                  />
                  {errors.gov_id_picture && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.gov_id_picture.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="justify-end">
              <Button type="button">
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

export default CreateClinicStaff;