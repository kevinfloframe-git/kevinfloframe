const { google } = require('googleapis')
const { AVAILABILITY, BUFFER_MINUTES, MIN_NOTICE_HOURS, TIMEZONE } = require('../config/sessions')

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
)
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

const calendar = google.calendar({ version: 'v3', auth })
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_EMAIL || 'primary'

// Returns array of ISO start time strings available for a given date + duration
async function getAvailableSlots(dateStr, durationMinutes) {
  const date = new Date(dateStr)
  const dayOfWeek = date.getDay()

  const isWeekend = AVAILABILITY.weekend.days.includes(dayOfWeek)
  const hours = isWeekend ? AVAILABILITY.weekend : AVAILABILITY.weekday

  // If the day isn't in any availability window, return empty
  const allAvailDays = [...AVAILABILITY.weekday.days, ...AVAILABILITY.weekend.days]
  if (!allAvailDays.includes(dayOfWeek)) return []

  // Build window start/end as CT timestamps
  const windowStart = toCtDate(dateStr, hours.start)
  const windowEnd = toCtDate(dateStr, hours.end)

  // Fetch existing events for the day
  const res = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: windowStart.toISOString(),
    timeMax: windowEnd.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    timeZone: TIMEZONE,
  })

  const events = (res.data.items || []).map(e => ({
    start: new Date(e.start.dateTime || e.start.date),
    end: new Date(e.end.dateTime || e.end.date),
  }))

  const totalSlotMinutes = durationMinutes + BUFFER_MINUTES
  const slotIntervalMinutes = 30
  const minBookTime = new Date(Date.now() + MIN_NOTICE_HOURS * 3600000)

  const slots = []
  let cursor = new Date(windowStart)

  while (cursor.getTime() + totalSlotMinutes * 60000 <= windowEnd.getTime()) {
    const slotEnd = new Date(cursor.getTime() + totalSlotMinutes * 60000)

    if (cursor > minBookTime) {
      const hasConflict = events.some(e => cursor < e.end && slotEnd > e.start)
      if (!hasConflict) {
        slots.push(cursor.toISOString())
      }
    }

    cursor = new Date(cursor.getTime() + slotIntervalMinutes * 60000)
  }

  return slots
}

// Creates a Google Calendar event for a confirmed booking
async function createBookingEvent(booking) {
  const { type, tierLabel, clientName, clientEmail, clientPhone, startTime, durationMinutes, price, deposit } = booking

  const start = new Date(startTime)
  const end = new Date(start.getTime() + durationMinutes * 60000)

  await calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: {
      summary: `📷 ${tierLabel} — ${clientName}`,
      description: [
        `📞 CALL CLIENT: ${clientPhone || 'no phone provided'}`,
        '',
        `Session: ${tierLabel}`,
        `Client: ${clientName}`,
        `Email: ${clientEmail}`,
        `Phone: ${clientPhone || 'not provided'}`,
        `Total: $${price}`,
        `Deposit due: $${deposit} (Venmo/Zelle/cash/check)`,
        `Balance before shoot: $${price - deposit}`,
        '',
        '⚠️ Send deposit invoice + PandaDoc contract before shoot.',
        '📸 Check gear checklist the night before.',
      ].join('\n'),
      start: { dateTime: start.toISOString(), timeZone: TIMEZONE },
      end: { dateTime: end.toISOString(), timeZone: TIMEZONE },
      colorId: '2', // Sage
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    },
  })
}

// Helper: build a Date in Central Time from a date string + hour integer
// Uses Intl to determine the correct UTC offset (CST = -06:00, CDT = -05:00)
function toCtDate(dateStr, hour) {
  const pad = n => String(n).padStart(2, '0')
  // Probe noon UTC on this date to find the actual CT offset
  const probe = new Date(`${dateStr}T12:00:00Z`)
  const ctNoonHour = parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: 'numeric', hour12: false }).format(probe)
  )
  // ctNoonHour == 6 → CST (UTC-6), ctNoonHour == 7 → CDT (UTC-5)
  const offsetHours = 12 - ctNoonHour
  const [y, m, d] = dateStr.split('-')
  return new Date(`${y}-${m}-${d}T${pad(hour)}:00:00-0${offsetHours}:00`)
}

module.exports = { getAvailableSlots, createBookingEvent }
