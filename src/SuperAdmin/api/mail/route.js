import { Resend } from "resend";
import Welcome from "../../../../emails/Welcome";

const resend = new Resend(import.meta.env.VITE_RESEND_RXGALING_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: "braymark675@gmail.com",
    subject: "hello world",
    react: Welcome(),
  });
}
