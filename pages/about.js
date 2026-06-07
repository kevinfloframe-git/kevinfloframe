import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Kevin Flo Frame</title>
        <meta name="description" content="Dallas-based photographer Kevin Flores — dark, moody, intentional photography for headshots, portraits, events, and product." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav />

      <section style={{ paddingTop: 120 }}>
        <p className="section-label">About</p>
        <h1 className="section-title">Kevin Flores</h1>

        <div className="about-layout" style={{ marginTop: 60 }}>
          <div className="about-img">
            {/* Drop a photo at public/about.jpg */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              background: 'var(--surface)',
              color: 'var(--border)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>Photo</div>
          </div>

          <div>
            <p style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 24, color: 'var(--text)' }}>
              Dallas-based photographer shooting headshots, portraits, events, and products
              with a dark, moody aesthetic built for the way people actually use images today.
            </p>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24 }}>
              Every frame is intentional. The goal isn&apos;t to cover everything — it&apos;s to
              deliver a tight set of images that actually get used. Whether you need a LinkedIn
              headshot that opens doors, family portraits you&apos;ll hang on a wall, or product
              photos that sell, I bring the same level of attention to every session.
            </p>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 40 }}>
              Based in the Dallas–Fort Worth area. Available for travel.
            </p>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
              <p className="section-label" style={{ marginBottom: 20 }}>Gear</p>
              <table style={{ borderCollapse: 'collapse', fontSize: 13, color: 'var(--muted)', width: '100%' }}>
                <tbody>
                  {[
                    ['Body', 'Sony A7V'],
                    ['Lens', 'Sony FE 24-70mm f/2.8 GM II'],
                    ['Storage', 'CFexpress Type A'],
                    ['Edit', 'Adobe Lightroom'],
                    ['Delivery', 'Pixieset'],
                  ].map(([label, val]) => (
                    <tr key={label}>
                      <td style={{ padding: '8px 24px 8px 0', color: 'var(--text)', width: 100 }}>{label}</td>
                      <td style={{ padding: '8px 0' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
