"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailParams = {
  from: string;
  cc?: string;
  subject: string;
  body: string;
};

export async function sendEmail({ from, cc, subject, body }: SendEmailParams) {
  if (!subject.trim() && !body.trim()) {
    return { success: false, error: "Subject and message cannot both be empty." };
  }

  if (!from.trim()) {
    return { success: false, error: "Your email address is required." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rahulcheryala787@gmail.com",
      replyTo: from,
      cc: cc?.trim() ? cc.split(",").map((e) => e.trim()) : undefined,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${from}\n\n${body}`,
    });

    return { success: true };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
