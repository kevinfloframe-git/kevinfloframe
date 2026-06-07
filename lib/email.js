const { google } = require('googleapis')

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
)
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

const gmail = google.gmail({ version: 'v1', auth })

async function sendEmail({ to, subject, html }) {
  const boundary = 'kff_boundary'
  const raw = [
    `From: Kevin Flo Frame <${process.env.KEVIN_EMAIL}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
    `--${boundary}--`,
  ].join('\r\n')

  const encoded = Buffer.from(raw).toString('base64url')
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encoded } })
}

function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

// Confirmation sent to the client after booking is submitted
async function sendClientConfirmation(booking) {
  const { tierLabel, clientName, clientEmail, startTime, price, deposit } = booking
  const remaining = price - deposit
  const dt = formatDateTime(startTime)
  const shortDate = new Date(startTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  await sendEmail({
    to: clientEmail,
    subject: `Booking request received — ${tierLabel} on ${shortDate}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <p style="font-size: 22px; font-weight: bold; letter-spacing: 0.05em;">Kevin Flo Frame</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />

        <p>Hi ${clientName},</p>
        <p>Got it — your session request is on the calendar. Here's what to expect next.</p>

        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Session</td><td>${tierLabel}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Date & Time</td><td>${dt}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Total</td><td>$${price}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Deposit to hold date</td><td>$${deposit}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Balance before shoot</td><td>$${remaining}</td></tr>
        </table>

        <p><strong>What happens next:</strong></p>
        <ol>
          <li>Kevin will send a <strong>deposit invoice</strong> to this email — pay to hold the date.</li>
          <li>Accepted: <strong>Venmo · Zelle · Cash · Check</strong></li>
          <li>Your <strong>contract</strong> arrives via PandaDoc within 24 hours — please sign it.</li>
          <li>Remaining balance of <strong>$${remaining}</strong> is due 48 hours before your session.</li>
        </ol>

        <p>Questions? Reply to this email.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p style="font-size: 12px; color: #888;">Kevin Flo Frame · Dallas, TX · kevinfloframe.com</p>
      </div>
    `,
  })
}

// Notification sent to Kevin when a new booking comes in
async function sendKevinNotification(booking) {
  const { tierLabel, clientName, clientEmail, clientPhone, startTime, price, deposit, notes } = booking
  const dt = formatDateTime(startTime)

  await sendEmail({
    to: process.env.KEVIN_EMAIL,
    subject: `🔔 New booking request — ${tierLabel} — ${clientName}`,
    html: `
      <div style="font-family: monospace; max-width: 560px; color: #1a1a1a;">
        <p><strong>New booking request</strong></p>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Session</td><td>${tierLabel}</td></tr>
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Date/Time</td><td>${dt}</td></tr>
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Client</td><td>${clientName}</td></tr>
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Email</td><td>${clientEmail}</td></tr>
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Phone</td><td>${clientPhone || '—'}</td></tr>
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Total</td><td>$${price}</td></tr>
          <tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Deposit due</td><td>$${deposit}</td></tr>
          ${notes ? `<tr><td style="padding: 4px 8px 4px 0; font-weight:bold;">Notes</td><td>${notes}</td></tr>` : ''}
        </table>
        <br/>
        <p><strong>Action items:</strong></p>
        <ol>
          <li>Send deposit invoice via Venmo/Zelle/cash — $${deposit}</li>
          <li>Send PandaDoc contract to ${clientEmail} within 24 hours</li>
        </ol>
        <p>Calendar event created ✅</p>
      </div>
    `,
  })
}

module.exports = { sendClientConfirmation, sendKevinNotification }
