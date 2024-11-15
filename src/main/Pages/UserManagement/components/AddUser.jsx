import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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

import AddUserEmailRole from "../../../../utils/data/add/addUser";
import fetchRole from "../../../../utils/data/fetch/fetchRole";
import useEmailApi from "../hooks/useEmailApi";
import { toast } from "sonner";

const addUserSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  role: z.string().min(1, { message: "Clinic Role is required." }),
});

const AddUser = () => {
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { sendInvite } = useEmailApi();
  const [url, setUrl] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  useEffect(() => {
    const getRoles = async () => {
      try {
        const roles = await fetchRole();
        setRoleData(roles);
      } catch (error) {
        setFetchError("Failed to fetch roles.");
      } finally {
        setLoading(false);
      }
    };
    getRoles();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setUrl("");

    switch (data.role) {
      case "Doctor":
        setUrl("http://localhost:3000/doctor-registration");
        break;
      case "Clinic Administrator":
      case "Clinic Nurse":
      case "Clinic Assistant":
      case "Clinic Secretary":
        setUrl("http://localhost:3000/staff-registration");
        break;

      default:
        break;
    }

    const response = sendInvite(data.email, data.role, url);

    if (response) {
      toast.success("Invitation sent successfully");
    } else {
      toast.error("Invitation error!");
    }

    // AddUserEmailRole(data);
  };

  return (
    <>
      <div className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="" className="rounded-md border w-full">
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[300px] rounded-md lg:w-[50%]">
            <DialogHeader>
              <DialogTitle>Invite Users</DialogTitle>
              <DialogDescription>
                Input user email and select clinic role.
              </DialogDescription>
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
                <div className="flex flex-col items-start gap-2">
                  <Label>Clinic Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Clinic Roles" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleData.map((roles, ids) => (
                            <div key={ids}>
                              <SelectItem value={roles.role}>
                                {roles.role}
                              </SelectItem>
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-red-400 italic text-xs py-1 lg:text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <div className="flex gap-3">
                  <Button type="submit" className="w-full lg:w-24">
                    Send
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

export default AddUser;
