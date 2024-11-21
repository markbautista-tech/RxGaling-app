// server.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // FOR LOCAL DEV
    // origin: "http://user.rxgaling.online", //FOR PRODUCTION
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { recipient, subject, htmlContent } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com", // Replace with your SMTP server
      port: 465, // Use the correct port (465 for secure connection)
      secure: true, // true for 465, false for other ports
      auth: {
        user: "resend",
        pass: process.env.SUPABASE_RESEND_API_KEY,
      },
    });

    const mailOptions = {
      from: "RxGaling <rxgaling-provider@rxgaling.online>",
      to: recipient,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: `Message sent: ${info.messageId}` });
  } catch (error) {
    res.status(500).send({ error: "Error occurred: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
