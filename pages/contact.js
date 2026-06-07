import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Kevin Flo Frame</title>
        <meta name="description" content="Book a session or ask a question — Kevin Flo Frame, Dallas photographer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <section style={{ paddingTop: 120 }}>
        <p className="section-label">Contact</p>
        <h1 className="section-title">Let&apos;s Work Together</h1>

        <div className="contact-layout" style={{ marginTop: 60 }}>
          <div>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 48 }}>
              For bookings, use the online scheduler — it&apos;s the fastest way to lock in a date.
              For questions, send an email and I&apos;ll reply within 24 hours.
            </p>

            <p className="section-label" style={{ marginBottom: 20 }}>Book</p>
            <a
              className="btn btn-accent"
              href="/book"
              style={{ marginBottom: 48, display: 'inline-block' }}
            >
              Book a Session Online
            </a>

            <p className="section-label" style={{ marginBottom: 20 }}>Reach Out</p>
            <a className="contact-link" href="mailto:kevinfloframe@gmail.com">
              kevinfloframe@gmail.com
            </a>
            <a className="contact-link" href="https://www.instagram.com/kevinfloframe" target="_blank" rel="noopener noreferrer">
              @kevinfloframe on Instagram
            </a>

            <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
              <p className="section-label" style={{ marginBottom: 16 }}>Location</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                Dallas, TX — DFW metro<br />
                (Plano · Frisco · McKinney · Fort Worth)<br />
                Available for travel
              </p>
            </div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 48 }}>
            <p className="section-label" style={{ marginBottom: 20 }}>Payment</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginBottom: 32 }}>
              A deposit is due within 24 hours of booking confirmation to hold your date.
              Balance is due 48 hours before shoot day.
            </p>
            {['Venmo', 'Zelle', 'Cash', 'Check'].map((m) => (
              <div key={m} style={{
                fontSize: 13,
                letterSpacing: '0.08em',
                color: 'var(--text)',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)'
              }}>{m}</div>
            ))}

            <div style={{ marginTop: 40 }}>
              <p className="section-label" style={{ marginBottom: 16 }}>Turnaround</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2 }}>
                Headshots: 3–5 business days<br />
                Portraits: 5–7 business days<br />
                Events: 7–10 business days<br />
                Product: 3–5 business days
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
