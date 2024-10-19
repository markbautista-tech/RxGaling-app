import { z } from "zod";

export const clinicRegSchema = z.object({
  fname: z.string().min(1, "First Name is required."),
  mname: z.string().optional(),
  lname: z.string().min(1, "Last Name is required."),
  extname: z.string().optional(),
  email: z.string().email("Invalid email address").trim(),
  contact_num: z
    .string()
    .min(10, "Contact number should be at least 10 digits.")
    .max(11, "Contact number should be no longer than 11 digits."),
  gender: z.string().min(1, "Gender is required."),
  region: z.string().min(1, { message: "Region is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  municipality: z.string().min(1, { message: "City/Municipality is required" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
  additional_address: z.string().optional(),
  clinic_name: z.string().min(1, "Clinic Name is required."),
  clinic_region: z.string().min(1, { message: "Region is required" }),
  clinic_province: z.string().min(1, { message: "Province is required" }),
  clinic_municipality: z
    .string()
    .min(1, { message: "City/Municipality is required" }),
  clinic_barangay: z.string().min(1, { message: "Barangay is required" }),
  clinic_additional_address: z.string().optional(),

  permit: z
    .any()
    .refine((file) => file && file.length > 0, { message: "File is required" }),
  bir: z
    .any()
    .refine((file) => file && file.length > 0, { message: "File is required" }),
  clinic_pic: z
    .any()
    .refine((file) => file && file.length > 0, { message: "File is required" }),
});
