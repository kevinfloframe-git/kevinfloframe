import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { SESSIONS } from '../config/sessions'

export default function DetailsPage() {
  const router = useRouter()
  const { type, tier, slot } = router.query

  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const session = type && SESSIONS[type]
  const tierData = session && tier && session.tiers[tier]

  if (!type || !tier || !slot || !session || !tierData) return null

  const formattedDate = new Date(slot).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Name, email, and phone number are required.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          tier,
          clientName: form.name,
          clientEmail: form.email,
          clientPhone: form.phone,
          startTime: slot,
          notes: form.notes,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      router.push(`/confirmed?name=${encodeURIComponent(form.name)}&deposit=${tierData.deposit}&total=${tierData.price}`)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Your Info — Kevin Flo Frame</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <div className="book-page">
        <div className="steps">
          <span className="step"><a href="/book">Session</a></span>
          <span className="sep">›</span>
          <span className="step"><a href={`/schedule?type=${type}&tier=${tier}`}>Date & Time</a></span>
          <span className="sep">›</span>
          <span className="step active">Your Info</span>
          <span className="sep">›</span>
          <span className="step">Confirmed</span>
        </div>

        <div className="book-layout">
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 'normal', letterSpacing: '0.03em', marginBottom: 8 }}>Your Information</h1>
            <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 40 }}>Kevin will send a deposit invoice after you submit.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="214-555-0100" required />
              </div>
              <div className="form-group">
                <label>Notes for Kevin (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Location preferences, session details, or questions…" />
              </div>

              {error && <p className="book-error">{error}</p>}

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn btn-ghost" onClick={() => router.back()}>← Back</button>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Booking…' : 'Request Booking →'}
                </button>
              </div>
            </form>
          </div>

          <div className="book-summary">
            <div className="summary-label">Booking Summary</div>
            <div className="summary-row"><span className="label">Session</span><span>{session.label}</span></div>
            <div className="summary-row"><span className="label">Tier</span><span>{tierData.label}</span></div>
            <div className="summary-row"><span className="label">Duration</span><span>{tierData.duration} min</span></div>
            <div className="summary-row" style={{ flexWrap: 'wrap', gap: 4 }}>
              <span className="label">Date</span>
              <span style={{ textAlign: 'right', fontSize: 13 }}>{formattedDate}</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row"><span className="label">Total</span><span>${tierData.price}</span></div>
            <div className="summary-row">
              <span className="label">Deposit to hold date</span>
              <span style={{ color: 'var(--accent)' }}>${tierData.deposit}</span>
            </div>
            <div className="summary-row">
              <span className="label">Balance before shoot</span>
              <span>${tierData.price - tierData.deposit}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, lineHeight: 1.5 }}>
              Kevin will send a deposit invoice. Date is held once deposit is received. Deposit is non-refundable.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
