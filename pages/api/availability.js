import { getAvailableSlots } from '../../lib/calendar'
import { SESSIONS, AVAILABILITY } from '../../config/sessions'

// GET /api/availability?type=headshots&tier=essential&date=2026-06-10
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { type, tier, date } = req.query

  if (!type || !tier || !date) {
    return res.status(400).json({ error: 'Missing type, tier, or date' })
  }

  const session = SESSIONS[type]
  if (!session) return res.status(404).json({ error: 'Unknown session type' })

  const tierData = session.tiers[tier]
  if (!tierData) return res.status(404).json({ error: 'Unknown tier' })

  if (tierData.duration === null) {
    return res.status(400).json({ error: 'This session requires a consultation — not self-bookable' })
  }

  // Check if the date falls on an available day
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  const allDays = [...AVAILABILITY.weekday.days, ...AVAILABILITY.weekend.days]
  if (!allDays.includes(dayOfWeek)) {
    return res.json({ slots: [] })
  }

  try {
    const slots = await getAvailableSlots(date, tierData.duration)
    return res.json({ slots })
  } catch (err) {
    console.error('Calendar error:', err)
    return res.status(500).json({ error: 'Failed to fetch availability' })
  }
}
