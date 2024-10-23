import "@babel/register";
import express, { json } from "express";
import axios from "axios";
// import { post } from "axios";
import cors from "cors";
import dotenv from "dotenv";
import ReactDOMServer from "react-dom/server";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// app.post("/send-email", async (req, res) => {
//   const emailHtml = ReactDOMServer.renderToStaticMarkup(
//     // <Welcome url={req.body.url} />
//     <html>
//       <head>
//         <meta charSet="utf-8" />
//         <title>Welcome Email</title>
//       </head>
//       <body>
//         <Welcome url={req.body.url} />
//       </body>
//     </html>
//   );

//   try {
//     const response = await axios.post(
//       "https://api.resend.com/emails",
//       {
//         from: "Acme <onboarding@resend.dev>",
//         to: ["braymark675@gmail.com"],
//         subject: "Hello World",
//         html: emailHtml,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.VITE_RESEND_RXGALING_API_KEY}`, // Store API Key in your environment variables
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// });

const resend = new Resend(process.env.VITE_RESEND_RXGALING_API_KEY);

app.post("/api/mail", async (req, res) => {
  // const welcomeHtml = ReactDOMServer.renderToString(<Welcome />);

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "braymark675@gmail.com",
      subject: "hello world",
      text: "Hello paksheeshh!!",
      html: "<h1>UKINANAN MAKAUMA!!!</h1>",
    });

    console.log("Received POST request to /api/mail");
    res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
  }
  res.status(200).json({ message: "Mail sent successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
