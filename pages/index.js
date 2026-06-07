import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const FEATURED = [
  { src: '/portfolio/headshots-01.jpg', label: 'Headshots' },
  { src: '/portfolio/portrait-01.jpg', label: 'Portraits' },
  { src: '/portfolio/product-01.jpg', label: 'Product' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Kevin Flo Frame — Dallas Photographer</title>
        <meta name="description" content="Dallas-based photographer specializing in headshots, portraits, events, and product photography. Dark, moody, intentional." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">Dallas, TX</p>
          <h1 className="hero-title">Kevin Flo Frame</h1>
          <p className="hero-sub">
            Headshots, portraits, events, and product photography.
            Dark, moody, and intentional.
          </p>
          <a className="btn btn-accent" href="https://book.kevinfloframe.com">Book a Session</a>
        </div>
      </div>

      {/* Featured work */}
      <section>
        <p className="section-label">Work</p>
        <h2 className="section-title">Selected Images</h2>
        <p className="section-body" style={{ marginBottom: 48 }}>
          A sample of recent work across headshots, portraits, and product sessions.
        </p>
        <div className="grid">
          {FEATURED.map((item) => (
            <div key={item.src} className="grid-item">
              {/* Replace with <img> once photos are in place */}
              <div className="grid-placeholder">{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link className="btn" href="/portfolio">View Full Portfolio</Link>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Services strip */}
      <section>
        <p className="section-label">Services</p>
        <h2 className="section-title">What I Shoot</h2>
        <p className="section-body">
          Whether you need a polished headshot or a full-day event covered, every session
          is tailored to what you actually need — not a one-size package.
        </p>
        <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['Headshots', 'Portraits', 'Events', 'Product'].map((s) => (
            <span key={s} style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              border: '1px solid var(--border)',
              padding: '10px 20px',
              color: 'var(--muted)'
            }}>{s}</span>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Link className="btn" href="/services">See Packages & Pricing</Link>
        </div>
      </section>

      <hr className="section-divider" />

      {/* CTA */}
      <section style={{ textAlign: 'center' }}>
        <p className="section-label">Let&apos;s Work Together</p>
        <h2 className="section-title">Ready to Book?</h2>
        <p className="section-body" style={{ margin: '0 auto 40px' }}>
          Pick your session type, choose a time, and you&apos;re on the calendar.
          No back-and-forth. Deposit due at booking confirmation.
        </p>
        <a className="btn btn-accent" href="https://book.kevinfloframe.com">Book Now</a>
      </section>

      <Footer />
    </>
  )
}
