import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
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
              <td style="padding: 10px 0; border-bottom: 10px solid #f0f0f0; font-weight: bold; color: #333333;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 10px solid #f0f0f0; color: #555555;">${subject || "No Subject"}</td>
            </tr>
          </table>

          <div style="margin-top: 30px;">
            <h3 style="color: #333333; font-size: 16px; margin-bottom: 10px;">Message Content:</h3>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; color: #444444; line-height: 1.6; white-space: pre-wrap; border-left: 4px solid #000000;">
              ${message}
            </div>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #999999; text-align: center;">
            This email was sent via your Portfolio Contact Form.
          </div>
        </div>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to send email' });
  }
}
