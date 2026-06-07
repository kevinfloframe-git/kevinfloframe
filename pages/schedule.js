import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { SESSIONS, AVAILABILITY, MAX_DAYS_AHEAD } from '../config/sessions'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function toLocalDateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}

function isAvailableDay(date) {
  const day = date.getDay()
  const allDays = [...AVAILABILITY.weekday.days, ...AVAILABILITY.weekend.days]
  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD)
  return allDays.includes(day) && date >= minDate && date <= maxDate
}

export default function SchedulePage() {
  const router = useRouter()
  const { type, tier } = router.query

  const [viewYear, setViewYear] = useState(new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [error, setError] = useState('')

  const session = type && SESSIONS[type]
  const tierData = session && tier && session.tiers[tier]

  useEffect(() => {
    if (!selectedDate) return
    setLoadingSlots(true)
    setSlots([])
    setSelectedSlot(null)
    setError('')

    fetch(`/api/availability?type=${type}&tier=${tier}&date=${selectedDate}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return }
        setSlots(data.slots || [])
      })
      .catch(() => setError('Failed to load availability. Please try again.'))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate, type, tier])

  if (!type || !tier || !session || !tierData) return null

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const handleNext = () => {
    if (!selectedSlot) return
    router.push(`/details?type=${type}&tier=${tier}&slot=${encodeURIComponent(selectedSlot)}`)
  }

  const formatTime = (iso) => new Date(iso).toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <>
      <Head>
        <title>Choose a Date — Kevin Flo Frame</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <div className="book-page">
        <div className="steps">
          <span className="step"><a href="/book">Session</a></span>
          <span className="sep">›</span>
          <span className="step active">Date & Time</span>
          <span className="sep">›</span>
          <span className="step">Your Info</span>
          <span className="sep">›</span>
          <span className="step">Confirmed</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 'normal', letterSpacing: '0.03em', marginBottom: 8 }}>Choose a Date & Time</h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 40 }}>
          {session.label} — {tierData.label} · {tierData.duration} min · ${tierData.price}
        </p>

        <div className="cal">
          <div className="cal-header">
            <button className="cal-nav" onClick={prevMonth}>‹</button>
            <span className="cal-month">{MONTHS[viewMonth]} {viewYear}</span>
            <button className="cal-nav" onClick={nextMonth}>›</button>
          </div>

          <div className="cal-grid">
            {DAYS.map(d => <div key={d} className="cal-day-label">{d}</div>)}

            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="cal-day empty" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const date = new Date(viewYear, viewMonth, day)
              const dateStr = toLocalDateStr(date)
              const available = isAvailableDay(date)
              const isSelected = selectedDate === dateStr
              const isToday = dateStr === toLocalDateStr(new Date())

              return (
                <div
                  key={day}
                  className={`cal-day ${available ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => available && setSelectedDate(dateStr)}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        {selectedDate && (
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 12 }}>
              Available times on {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>

            {loadingSlots && <p className="book-loading">Checking availability…</p>}
            {error && <p className="book-error">{error}</p>}

            {!loadingSlots && !error && slots.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>No availability on this date. Try another day.</p>
            )}

            {slots.length > 0 && (
              <div className="slots">
                {slots.map(slot => (
                  <div
                    key={slot}
                    className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {formatTime(slot)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" onClick={() => router.back()}>← Back</button>
          <button className="btn" disabled={!selectedSlot} onClick={handleNext}>
            Continue →
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}
