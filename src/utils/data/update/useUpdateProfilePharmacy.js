import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePharmacyUser } from "@/context/UserPharmacyContext";
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
  additional_address: z.string(),
  day: z.string(),
  month: z.string(),
  year: z.string(),
  address_id: z.string(),
  user_id: z.string()
});

const useUpdateProfilePharmacy = (userDetails) => {
  const navigate = useNavigate();
  const { pharmacyUser, setPharmacyUser } = usePharmacyUser();
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

  console.log(data)


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
        .eq('id', pharmacyUser.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const address_payload = {
        region: data.region,
        province: data.province,
        city: data.municipality,
        barangay: data.barangay,
        address_line: data.additional_address
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
      setPharmacyUser(prev => ({ ...prev, ...updatedAddress, ...updatedProfile }));
      navigate("/pharmacy-app");
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

export default useUpdateProfilePharmacy;