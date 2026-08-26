import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import { reviewContactMessage } from '@/lib/contact-message-review'
import { evaluateContactFields, isSuspiciousFillTime } from '@/lib/contact-protection'
import { getRequestIp, isContactRateLimited } from '@/lib/contact-rate-limit'
import { isTurnstileConfigured, verifyTurnstileToken } from '@/lib/turnstile'

const CONTACT_EMAIL = process.env.ZOHO_EMAIL_USER || 'info@vbizme.com'

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
  secure: process.env.ZOHO_SMTP_SECURE === 'true',
  auth: {
    user: process.env.ZOHO_EMAIL_USER,
    pass: process.env.ZOHO_EMAIL_PASSWORD,
  },
})

type ContactFormData = {
  name?: string
  email?: string
  phone?: string
  message?: string
  website?: string
  turnstileToken?: string
  startedAt?: number
  confirmed?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const ip = getRequestIp(request)
    if (isContactRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 })
    }

    const body = (await request.json()) as ContactFormData
    const name = typeof body.name === 'string' ? body.name : ''
    const email = typeof body.email === 'string' ? body.email : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const message = typeof body.message === 'string' ? body.message : ''
    const honeypot = typeof body.website === 'string' ? body.website.trim() : ''

    if (honeypot) {
      return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
    }

    if (body.confirmed !== true || isSuspiciousFillTime(body.startedAt)) {
      return NextResponse.json({ error: 'Please review and confirm your message, then try again.' }, { status: 400 })
    }

    const fields = evaluateContactFields({ name, email, message })
    if (!fields.ok) {
      return NextResponse.json(
        { error: fields.errors.message || fields.errors.email || fields.errors.name || 'Invalid form' },
        { status: 400 }
      )
    }

    if (!isTurnstileConfigured()) {
      console.error('Contact form blocked: Cloudflare Turnstile keys are not configured.')
      return NextResponse.json({ error: 'Message protection is temporarily unavailable.' }, { status: 503 })
    }

    const human = await verifyTurnstileToken(body.turnstileToken || '', ip === 'unknown' ? undefined : ip)
    if (!human) {
      return NextResponse.json({ error: 'Please complete the human verification and try again.' }, { status: 400 })
    }

    const review = await reviewContactMessage({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    })
    if (review === 'block') {
      return NextResponse.json(
        { error: 'This message could not be sent. Please write a genuine inquiry in your own words.' },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: `vBiz Me Contact Form <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      subject: `${escapeHtml(email.trim())} — ${escapeHtml(name.trim())}`,
      replyTo: email.trim(),
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
                <td style="padding:8px 0;">${escapeHtml(name.trim())} &lt;${escapeHtml(email.trim())}&gt;</td>
              </tr>
              ${phone ? `<tr><td style="padding:8px 0; color:#555"><strong>Phone</strong></td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>` : ''}
            </table>

            <div style="margin-top:18px; padding:16px; background:#f7f7f8; border-radius:8px; color:#222; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message.trim())}</div>

            <p style="margin:18px 0 0 0; font-size:13px; color:#666">Reply directly using this address: <a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></p>
          </div>

          <div style="padding:12px 20px; background:#fafafa; font-size:12px; color:#777; text-align:center">vBiz Me — The Virtual Business Card That Sells For You</div>
        </div>
      `,
    })

    await transporter.sendMail({
      from: `vBiz Me <${CONTACT_EMAIL}>`,
      to: email.trim(),
      subject: 'We received your message — vBiz Me',
      html: `
        <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; max-width:700px; margin:0 auto; border-radius:10px; overflow:hidden; border:1px solid #eee;">
          <div style="background:#d4af37; padding:18px 20px; color:#081018; font-weight:700;">vBiz Me</div>
          <div style="padding:20px; background:#fff; color:#111;">
            <h2 style="margin:0 0 8px 0;">Thanks, ${escapeHtml(name.trim())}!</h2>
            <p style="margin:0 0 12px 0; color:#555">We've received your message and will get back to you soon.</p>

            <div style="margin-top:12px; padding:14px; background:#f7f7f8; border-radius:8px; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message.trim())}</div>

            <p style="margin:16px 0 0 0; font-size:13px; color:#666">If you need to reach us immediately, reply to this email or contact <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
          </div>
          <div style="padding:12px 20px; background:#fafafa; font-size:12px; color:#777; text-align:center">vBiz Me — The Virtual Business Card That Sells For You</div>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
