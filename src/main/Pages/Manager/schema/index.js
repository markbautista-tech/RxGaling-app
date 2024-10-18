

//Clinic Days, Clinic Hours, Manually toggling whether a doctor is in or out

import { z } from "zod";

export const doctorSchedule = z.object({
  days: z.string().optional(),
  hours: z.string().optional(),
  toggle: z.string().optional(),
});

