import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  try {
    // Call Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html,
        // react: req.body.react,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text(); // get raw text of the error response
      return res
        .status(response.status)
        .json({ message: "Failed to send email", error: errorData });
    }

    const data = await response.json(); // Parse successful response as JSON
    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
