import { createBookingEvent } from '../../lib/calendar'
import { sendClientConfirmation, sendKevinNotification } from '../../lib/email'
import { SESSIONS } from '../../config/sessions'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { type, tier, clientName, clientEmail, clientPhone, startTime, notes } = req.body

  if (!type || !tier || !clientName || !clientEmail || !clientPhone || !startTime) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const session = SESSIONS[type]
  const tierData = session?.tiers[tier]

  if (!tierData || tierData.duration === null) {
    return res.status(400).json({ error: 'Invalid session or requires consultation' })
  }

  const booking = {
    type,
    tier,
    tierLabel: `${session.label} — ${tierData.label}`,
    clientName: clientName.trim(),
    clientEmail: clientEmail.trim(),
    clientPhone: clientPhone?.trim() || '',
    startTime,
    durationMinutes: tierData.duration,
    price: tierData.price,
    deposit: tierData.deposit,
    notes: notes?.trim() || '',
  }

  try {
    await Promise.all([
      createBookingEvent(booking),
      sendClientConfirmation(booking),
      sendKevinNotification(booking),
    ])
    return res.json({ ok: true })
  } catch (err) {
    console.error('Booking error:', err)
    return res.status(500).json({ error: 'Booking failed. Please try again or contact Kevin directly.' })
  }
}
