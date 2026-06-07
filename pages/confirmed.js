import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ConfirmedPage() {
  const router = useRouter()
  const { name, deposit, total } = router.query

  return (
    <>
      <Head>
        <title>Confirmed — Kevin Flo Frame</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <div className="book-page" style={{ textAlign: 'center' }}>
        <div className="steps" style={{ justifyContent: 'center' }}>
          <span className="step">Session</span>
          <span className="sep">›</span>
          <span className="step">Date & Time</span>
          <span className="sep">›</span>
          <span className="step">Your Info</span>
          <span className="sep">›</span>
          <span className="step active">Confirmed</span>
        </div>

        <div className="check">✓</div>
        <h1 style={{ fontSize: 28, fontWeight: 'normal', letterSpacing: '0.03em', marginBottom: 12 }}>
          {name ? `Thanks, ${name.split(' ')[0]}.` : "You're booked."}
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: 40, maxWidth: 480, margin: '12px auto 40px' }}>
          Your session is on the calendar. Check your email — Kevin will be in touch shortly with a deposit invoice.
        </p>

        {deposit && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', maxWidth: 420, margin: '0 auto 40px', textAlign: 'left' }}>
            <div className="summary-label">Deposit Invoice</div>
            <div className="summary-row">
              <span style={{ color: 'var(--muted)' }}>Deposit to hold date</span>
              <span style={{ color: 'var(--accent)' }}>${deposit}</span>
            </div>
            {total && (
              <div className="summary-row" style={{ marginBottom: 16 }}>
                <span style={{ color: 'var(--muted)' }}>Balance due before shoot</span>
                <span>${parseInt(total) - parseInt(deposit)}</span>
              </div>
            )}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
              <strong style={{ color: 'var(--text)' }}>Accepted payment methods:</strong><br />
              Venmo · Zelle · Cash · Check<br />
              <span style={{ fontSize: 12 }}>Details in your confirmation email.</span>
            </div>
          </div>
        )}

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', maxWidth: 420, margin: '0 auto 40px', textAlign: 'left' }}>
          <div className="summary-label">What Happens Next</div>
          <ol style={{ paddingLeft: 20, color: 'var(--muted)', fontSize: 14, lineHeight: 2 }}>
            <li>Kevin sends a <strong style={{ color: 'var(--text)' }}>deposit invoice</strong> to your email — pay to hold the date.</li>
            <li>Your <strong style={{ color: 'var(--text)' }}>contract</strong> arrives via PandaDoc within 24 hours — please sign it.</li>
            <li>Remaining balance due <strong style={{ color: 'var(--text)' }}>48 hours before</strong> your session.</li>
            <li>After your session, your gallery is delivered via a <strong style={{ color: 'var(--text)' }}>private online link</strong>.</li>
          </ol>
        </div>

        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 40 }}>
          Questions? Email <a href="mailto:kevinfloframe@gmail.com" style={{ color: 'var(--accent)' }}>kevinfloframe@gmail.com</a>
        </p>
      </div>

      <Footer />
    </>
  )
}
