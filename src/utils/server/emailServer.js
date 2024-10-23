import express, { json } from "express";
import { post } from "axios";
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.post("/send-email", async (req, res) => {
  try {
    const response = await post(
      "https://api.resend.com/emails",
      {
        // data and API key can be passed from the request or environment variables
        from: "Acme <onboarding@resend.dev>",
        to: ["braymark675@gmail.com"],
        subject: "Hello World",
        react: req.body.react,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_RESEND_RXGALING_API_KEY}`, // Store API Key in your environment variables
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
