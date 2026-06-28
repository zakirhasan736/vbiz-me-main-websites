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

    // Send email to your inbox (branded HTML)
    await transporter.sendMail({
      from: `vBiz Me Contact Form <${process.env.ZOHO_EMAIL_USER}>`,
      to: process.env.ZOHO_EMAIL_USER || 'info@vbizme.com',
      subject: `${escapeHtml(email)} — ${escapeHtml(name)}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:700px; margin:0 auto; border-radius:10px; overflow:hidden; border:1px solid #eee;">
          <div style="background: linear-gradient(90deg,#0b1020 0%,#151522 100%); padding:18px 20px; color:#fff; display:flex; align-items:center; gap:12px;">
            <div style="width:46px;height:46px;border-radius:8px;background:#d4af37;display:flex;align-items:center;justify-content:center;font-weight:700;color:#081018">vB</div>
            <div>
              <div style="font-size:18px;font-weight:700">vBiz Me</div>
              <div style="font-size:12px;opacity:0.85">New contact form submission</div>
            </div>
          </div>

          <div style="padding:20px; background:#fff; color:#111;">
            <p style="margin:0 0 12px 0; font-size:15px;">You received a new message via the website contact form.</p>

            <table style="width:100%; font-size:14px; border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0; width:120px; color:#555"><strong>From</strong></td>
                <td style="padding:8px 0;">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</td>
              </tr>
              ${phone ? `<tr><td style="padding:8px 0; color:#555"><strong>Phone</strong></td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>` : ''}
            </table>

            <div style="margin-top:18px; padding:16px; background:#f7f7f8; border-radius:8px; color:#222; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</div>

            <p style="margin:18px 0 0 0; font-size:13px; color:#666">Reply directly using this address: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          </div>

          <div style="padding:12px 20px; background:#fafafa; font-size:12px; color:#777; text-align:center">vBiz Me — The Virtual Business Card That Sells For You</div>
        </div>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `vBiz Me <${process.env.ZOHO_EMAIL_USER}>`,
      to: email,
      subject: 'We received your message — vBiz Me',
      html: `
        <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:700px; margin:0 auto; border-radius:10px; overflow:hidden; border:1px solid #eee;">
          <div style="background:#d4af37; padding:18px 20px; color:#081018; font-weight:700;">vBiz Me</div>
          <div style="padding:20px; background:#fff; color:#111;">
            <h2 style="margin:0 0 8px 0;">Thanks, ${escapeHtml(name)}!</h2>
            <p style="margin:0 0 12px 0; color:#555">We've received your message and will get back to you soon.</p>

            <div style="margin-top:12px; padding:14px; background:#f7f7f8; border-radius:8px; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</div>

            <p style="margin:16px 0 0 0; font-size:13px; color:#666">If you need to reach us immediately, reply to this email or contact <a href="mailto:${process.env.ZOHO_EMAIL_USER}">${process.env.ZOHO_EMAIL_USER}</a>.</p>
          </div>
          <div style="padding:12px 20px; background:#fafafa; font-size:12px; color:#777; text-align:center">vBiz Me — The Virtual Business Card That Sells For You</div>
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
