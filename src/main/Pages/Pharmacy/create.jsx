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
  pharmacy_name: z.string().optional(),
  pharmacy_address: z.string().optional(),
  pharmacy_loc: z.string().optional(),
})
const CreatePartnerPharmacy = () =>
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
            <Button>Add Partner Pharmacy</Button>
          </DialogTrigger>
          <DialogContent className="w-4/5">
            <DialogHeader>
              <DialogTitle>Partner Pharmacy Form</DialogTitle>
            </DialogHeader>
            <div className="">
              <div className="font-bold text-xl tracking-wider py-4 border-b-2 ">
                Partner Pharmacy Management
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4">
                  <Label>Pharmacy Name</Label>
                  <Input
                    {...register("pharmacy_name")}
                    placeholder=""
                  />
                  {errors.pharmacy_name && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.pharmacy_name.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label>Pharmacy Address</Label>
                  <Input
                    {...register("pharmacy_address")}
                    placeholder=""
                  />
                  {errors.pharmacy_address && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.pharmacy_address.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label>Pharmacy Location</Label>
                  <Input
                    {...register("pharmacy_loc")}
                    placeholder=""
                  />
                  {errors.pharmacy_loc && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.pharmacy_loc.message}
                    </p>
                  )}
                </div>

              </div>
            </div>
            <DialogFooter className="justify-end">
              <Button type="submit">
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

export default CreatePartnerPharmacy;