import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { SESSIONS } from '../config/sessions'

export default function BookPage() {
  const router = useRouter()
  const [selected, setSelected] = useState({ type: null, tier: null })

  const handleSelect = (type, tier) => {
    if (SESSIONS[type].requiresConsultation) return
    setSelected({ type, tier })
  }

  const handleNext = () => {
    if (!selected.type || !selected.tier) return
    router.push(`/schedule?type=${selected.type}&tier=${selected.tier}`)
  }

  return (
    <>
      <Head>
        <title>Book a Session — Kevin Flo Frame</title>
        <meta name="description" content="Book a photography session with Kevin Flo Frame. Headshots, portraits, events, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <div className="book-page">
        <div className="steps">
          <span className="step active">Session</span>
          <span className="sep">›</span>
          <span className="step">Date & Time</span>
          <span className="sep">›</span>
          <span className="step">Your Info</span>
          <span className="sep">›</span>
          <span className="step">Confirmed</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 'normal', letterSpacing: '0.03em', marginBottom: 8 }}>Book a Session</h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 40 }}>Select a session type and tier to see availability.</p>

        {Object.entries(SESSIONS).map(([type, session]) => (
          <SessionCard
            key={type}
            type={type}
            session={session}
            selected={selected}
            onSelect={handleSelect}
          />
        ))}

        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button
            className="btn"
            disabled={!selected.type || !selected.tier}
            onClick={handleNext}
          >
            Choose Date & Time →
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

function SessionCard({ type, session, selected, onSelect }) {
  const isOpen = selected.type === type
  const isConsultation = session.requiresConsultation

  return (
    <div className={`session-card ${isConsultation ? 'consultation' : ''} ${isOpen ? 'selected' : ''}`}>
      <div className="card-header" onClick={() => !isConsultation && onSelect(type, Object.keys(session.tiers)[0])}>
        <span className="card-title">{session.label}</span>
        {isConsultation && <span className="card-badge">Quote required</span>}
      </div>
      <p className="card-desc">{session.description}</p>

      {!isConsultation && (
        <div className="tiers">
          {Object.entries(session.tiers).map(([tier, data]) => (
            <div
              key={tier}
              className={`tier ${selected.type === type && selected.tier === tier ? 'selected' : ''}`}
              onClick={() => onSelect(type, tier)}
            >
              <div className="tier-name">{data.label}</div>
              <div className="tier-price">
                ${data.price}
                <span style={{ fontSize: 13, marginLeft: 4 }}>total</span>
              </div>
              <ul className="tier-detail">
                {data.highlights.map((h, i) => (
                  <li key={i}>— {h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {isConsultation && (
        <a
          href={`mailto:kevinfloframe@gmail.com?subject=${encodeURIComponent(`Quote request — ${session.label}`)}`}
          className="btn btn-ghost"
          style={{ fontSize: 12, display: 'inline-block' }}
        >
          Request a Quote →
        </a>
      )}
    </div>
  )
}
