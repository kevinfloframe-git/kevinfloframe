import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// Add entries here as sessions are completed.
// Images live in public/portfolio/{filename}
const IMAGES = [
  // { src: '/portfolio/headshots-01.jpg', category: 'Headshots', alt: 'Professional headshot' },
]

const CATEGORIES = ['All', 'Headshots', 'Portraits', 'Events', 'Product']

const PLACEHOLDERS = [
  'Headshots', 'Portraits', 'Events', 'Product',
  'Headshots', 'Portraits', 'Events', 'Product',
  'Headshots', 'Portraits',
]

export default function Portfolio() {
  const hasImages = IMAGES.length > 0

  return (
    <>
      <Head>
        <title>Portfolio — Kevin Flo Frame</title>
        <meta name="description" content="Photography portfolio — headshots, portraits, events, and product sessions in Dallas, TX." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <section style={{ paddingTop: 120 }}>
        <p className="section-label">Portfolio</p>
        <h1 className="section-title">The Work</h1>
        <p className="section-body" style={{ marginBottom: 60 }}>
          Building the portfolio now — first model call sessions underway.
          Check back soon or{' '}
          <a href="https://www.instagram.com/kevinfloframe" style={{ color: 'var(--accent)' }}>
            follow on Instagram
          </a>{' '}
          for new work.
        </p>

        {hasImages ? (
          <>
            <div style={{ marginBottom: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {CATEGORIES.map((c) => (
                <button key={c} className="btn" style={{ padding: '8px 16px', fontSize: 10 }}>{c}</button>
              ))}
            </div>
            <div className="grid">
              {IMAGES.map((img) => (
                <div key={img.src} className="grid-item">
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid">
            {PLACEHOLDERS.map((label, i) => (
              <div key={i} className="grid-item">
                <div className="grid-placeholder">{label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}
