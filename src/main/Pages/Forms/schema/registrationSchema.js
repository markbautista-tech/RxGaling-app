import { z } from "zod";

export const registrationSchema = z.object({
  fname: z.string().min(1, "First Name is required."),
  mname: z.string().optional(),
  lname: z.string().min(1, "Last Name is required."),
  extname: z.string().optional(),
  email: z.string().email("Invalid email address").trim(),
  contact_num: z
    .string()
    .min(10, "Contact number should be at least 10 digits.")
    .max(11, "Contact number should be no longer than 11 digits."),

  month: z.string().min(1, "Month is required."),
  day: z.string().refine((val) => val >= 1 && val <= 31, {
    message: "Day must be between 1 and 31",
  }),
  year: z
    .string()
    .refine((val) => val >= 1700 && val <= new Date().getFullYear(), {
      message: `Year must be between 1700 and ${new Date().getFullYear()}`,
    }),
  age: z.string().min(1, "Age is required."),
  gender: z.string().min(1, "Gender is required."),
  region: z.string().min(1, { message: "Region is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  municipality: z.string().min(1, { message: "City/Municipality is required" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
  additional_address: z.string().optional(),
  license_num: z.string().optional(),
  specialty: z.string().min(1, "Specialization is required."),
  prc_no: z.string().optional(),
  prof_extension: z.string().optional(),
  // valid_id: z
  //   .any()
  //   .refine((file) => file?.length !== 0, "File is required")
  //   .refine((file) => file.size < 300000000, "Max size is 30MB."),
  // .refine((file) => checkFileType(file), "Only .pdf, .docx formats are supported."),
  //z.string().optional(),
  ptr_num: z.string().optional(),
  s2_license_num: z.string().optional(),
});
