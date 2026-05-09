import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "RESEND_API_KEY is not configured" });
    }

    try {
      const data = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["strrobin363@gmail.com"],
        replyTo: email,
        subject: `Message from ${name}: ${subject || "Contact Form"}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #000000; padding-bottom: 20px; margin-bottom: 20px;">
              <h2 style="color: #000000; margin: 0; font-size: 24px; letter-spacing: -0.5px;">New Contact Submission</h2>
              <p style="color: #666666; margin: 5px 0 0 0; font-size: 14px;">Incoming message from your website portfolio.</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 120px; font-weight: bold; color: #333333;">Sender Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333333;">Email Address</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #0066cc;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333333;">Phone Number</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555555;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333333;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #555555;">${subject || "No Subject"}</td>
              </tr>
            </table>

            <div style="margin-top: 30px;">
              <h3 style="color: #333333; font-size: 16px; margin-bottom: 10px;">Message Content:</h3>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; color: #444444; line-height: 1.6; white-space: pre-wrap; border-left: 4px solid #000000;">
                ${message}
              </div>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #999999; text-align: center;">
              This email was sent via your Portfolio Contact Form API.
            </div>
          </div>
        `,
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Resend error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
