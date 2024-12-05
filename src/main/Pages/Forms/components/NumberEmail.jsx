import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserData } from "@/utils/data/fetch/getUserDetails";

const NumberEmail = ({ register, errors, watch, setError, clearErrors }) => {
  const [existingUsers, setExistingUsers] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const users = await getUserData(); // Fetch all user details
        setExistingUsers(users); // Store the users in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Watch the email and contact_num fields
  const emailValue = watch("email");
  const contactValue = watch("contact_num");

  useEffect(() => {
    if (emailValue && existingUsers.length > 0) {
      const emailExists = existingUsers.some(
        (user) => user.email === emailValue
      );
      if (emailExists) {
        setError("email", { type: "manual", message: "Email already exists" });
      } else {
        clearErrors("email");
      }
    }
  }, [emailValue, existingUsers, setError, clearErrors]);

  useEffect(() => {
    if (contactValue && existingUsers.length > 0) {
      const contactExists = existingUsers.some(
        (user) => user.mobile_number === contactValue
      );
      if (contactExists) {
        setError("contact_num", {
          type: "manual",
          message: "Contact number already exists",
        });
      } else {
        clearErrors("contact_num");
      }
    }
  }, [contactValue, existingUsers, setError, clearErrors]);

  return (
    <>
      <div>
        <Label>Mobile Number</Label>
        <Input
          {...register("contact_num")}
          type="number"
          placeholder="Enter mobile number"
        />
        {errors.contact_num && (
          <p className="text-red-400 italic text-xs py-1 lg:text-sm">
            {errors.contact_num.message}
          </p>
        )}
      </div>
      <div>
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
    </>
  );
};

export default NumberEmail;
