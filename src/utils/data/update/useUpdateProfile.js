import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { centralSupabase } from "@/utils/supabaseClient";

import { z } from "zod";
import { useNavigate } from "react-router-dom";

export const Profilemgmtschema = z.object({
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  mobile_number: z.string(),
  suffix: z.string(),
  gender: z.string(),
  region: z.string(),
  province: z.string(),
  municipality: z.string(),
  barangay: z.string(),
  day: z.string(),
  month: z.string(),
  year: z.string(),
  address_id: z.string(),
  user_id: z.string()
});

const useUpdateProfile = (userDetails) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Profilemgmtschema)
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formattedBirthdate = `${data.year}-${data.month}-${data.day}`;
      
      const user_payload = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        suffix: data.suffix,
        mobile_number: data.mobile_number,
        gender: data.gender,
        birthdate: formattedBirthdate
      };

      const { data: updatedProfile, error } = await centralSupabase
        .from('users')
        .update(user_payload)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const address_payload = {
        region: data.region,
        province: data.province,
        city: data.municipality,
        barangay: data.barangay
      }
      
      const { data: updatedAddress, error: addressError } = await centralSupabase
        .from('addresses')
        .update(address_payload)
        .eq('id', data.address_id)
        .select()
        .single();

      if (addressError) {
        throw addressError;
      }

      toast.success("Profile updated successfully");
      setUser(prev => ({ ...prev, ...updatedProfile }));
      navigate("/clinic-app");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    loading,
    watch,
  };
};

export default useUpdateProfile;