import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const PACKAGES = [
  {
    name: 'Headshots — Essential',
    price: '$250',
    duration: '1 hr',
    deposit: '$125',
    highlights: ['1 outfit / look', '2 edited finals', 'Digital delivery'],
  },
  {
    name: 'Headshots — Pro',
    price: '$400',
    duration: '1.5 hr',
    deposit: '$200',
    highlights: ['2 outfits / looks', '5 edited finals', 'Digital delivery', 'LinkedIn + social crops'],
  },
  {
    name: 'Portrait — Standard',
    price: '$350',
    duration: '1.5 hr',
    deposit: '$175',
    highlights: ['1–2 locations', '10 edited finals', 'Digital delivery'],
  },
  {
    name: 'Portrait — Extended',
    price: '$550',
    duration: '2.5 hr',
    deposit: '$275',
    highlights: ['2–3 locations', '20 edited finals', 'Digital delivery', 'Print-ready files'],
  },
  {
    name: 'Mini Session',
    price: '$150',
    duration: '30 min',
    deposit: '$75',
    highlights: ['1 location', '5 edited finals', 'Digital delivery'],
    note: 'Limited availability — batched on select dates',
  },
  {
    name: 'Product Photography',
    price: 'From $300',
    duration: '2 hr',
    deposit: '$150',
    highlights: ['White / dark background', '10 edited finals', 'Commercial license included'],
    note: 'Pricing varies by product count and complexity',
  },
  {
    name: 'Event Coverage',
    price: 'From $500',
    duration: '2 hr minimum',
    deposit: '$250',
    highlights: ['Documentary style', '50+ edited finals', 'Online gallery', 'Digital download'],
    note: 'Quote required — contact for full-day rates',
  },
  {
    name: 'Corporate / Team',
    price: 'Quote',
    duration: 'By scope',
    deposit: null,
    highlights: ['On-site or studio', 'Team headshots + brand shots', 'Rush delivery available'],
    note: 'Contact for a custom quote',
  },
]

export default function Services() {
  return (
    <>
      <Head>
        <title>Services & Pricing — Kevin Flo Frame</title>
        <meta name="description" content="Photography packages and pricing — headshots, portraits, events, and product photography in Dallas, TX." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <section style={{ paddingTop: 120 }}>
        <p className="section-label">Services</p>
        <h1 className="section-title">Packages & Pricing</h1>
        <p className="section-body" style={{ marginBottom: 24 }}>
          Every session includes a 48-hour minimum notice window. Deposit due within 24 hours
          of booking confirmation. Balance due 48 hours before shoot day.
        </p>
        <p style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 60 }}>
          Payment accepted via Venmo · Zelle · Cash · Check
        </p>

        <div className="services-grid">
          {PACKAGES.map((pkg) => (
            <div key={pkg.name} className="service-card">
              <p className="service-name">{pkg.name}</p>
              <p className="service-price">
                {pkg.price}
                {pkg.duration && <span> · {pkg.duration}</span>}
              </p>
              {pkg.deposit && (
                <p style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 16 }}>
                  ${pkg.deposit.replace('$', '')} deposit to hold date
                </p>
              )}
              <ul style={{ listStyle: 'none', marginBottom: pkg.note ? 12 : 0 }}>
                {pkg.highlights.map((h) => (
                  <li key={h} className="service-desc" style={{ marginBottom: 4 }}>
                    — {h}
                  </li>
                ))}
              </ul>
              {pkg.note && (
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, letterSpacing: '0.05em' }}>
                  {pkg.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 80, borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <p className="section-label">Ready?</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>Book a Session</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a className="btn btn-accent" href="https://book.kevinfloframe.com">Book Online</a>
            <a className="btn" href="mailto:kevinfloframe@gmail.com">Ask a Question</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
