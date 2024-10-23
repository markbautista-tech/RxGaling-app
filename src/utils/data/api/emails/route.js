import { Resend } from "resend";
import Welcome from "../../../../emails/Welcome";

const resend = new Resend(import.meta.env.VITE_RESEND_RXGALING_API_KEY);

export async function DeclineEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["braymark675@gmail.com"],
      subject: "Hello World",
      react: Welcome(),
    });

    if (error) {
      return console.error("Error:", error);
    }

    console.log("Email sent successfully:", data);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}
