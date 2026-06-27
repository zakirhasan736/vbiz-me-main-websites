import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
  secure: process.env.ZOHO_SMTP_SECURE === 'true',
  auth: {
    user: process.env.ZOHO_EMAIL_USER,
    pass: process.env.ZOHO_EMAIL_PASSWORD,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to your inbox
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL_USER,
      to: 'info@vbizme.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0b1020;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          
          <h3 style="color: #0b1020;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">This message was sent from your vBiz Me contact form.</p>
        </div>
      `,
      replyTo: email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL_USER,
      to: email,
      subject: 'We received your message - vBiz Me',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Thank you, ${escapeHtml(name)}!</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            We've received your message and will get back to you shortly.
          </p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0 0 0; color: #333; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          
          <p style="font-size: 14px; color: #999;">
            Typical response time: 24-48 hours
          </p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">vBiz Me - The Virtual Business Card That Sells For You</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
