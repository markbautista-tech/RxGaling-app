import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaUserDoctor } from "react-icons/fa6";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import useEmailApi from "@/main/Pages/UserManagement/hooks/useEmailApi";
import { SquarePlus } from "lucide-react";

const addUserSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
});

const AddDoctor = () => {
  const [fetchError, setFetchError] = useState(null);
  const { sendDoctorInvite, loading } = useEmailApi();
  const [url, setUrl] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = async (data) => {
    setUrl(null);
    setUrl("http://localhost:3000/doctor-registration");

    //FOR DEPLOYMENT
    //setUrl("https://user.rxgaling.online/doctor-registration");

    console.log(url);
    const response = await sendDoctorInvite(data.email, url);

    if (response) {
      toast.success("Invitation sent successfully");
      reset();
    } else {
      toast.error("Invitation error!");
    }
  };

  return (
    <>
      <div className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-md flex justify-start items-center w-full"
            >
              <SquarePlus className="w-6 h-6" />
              <span className="">Add New Doctor</span>{" "}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[300px] rounded-md lg:w-[50%]">
            <DialogHeader>
              <DialogTitle>Invite Doctor to your Clinic</DialogTitle>
              <DialogDescription>Input doctor's email.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-5 flex flex-col gap-4 lg:px-5">
                <div className="flex flex-col items-start gap-2">
                  <Label>Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="w-full lg:w-36 lg:text-[16px]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="mr-2 h-4 w-4 inline-block border-2 border-t-2 border-gray-200 border-t-purple-950 rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddDoctor;
