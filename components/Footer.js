export default function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} Kevin Flo Frame · Dallas, TX</span>
      <div style={{ display: 'flex', gap: 24 }}>
        <a href="https://www.instagram.com/kevinfloframe" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}>Instagram</a>
        <a href="https://book.kevinfloframe.com" style={{ color: 'var(--muted)' }}>Book</a>
        <a href="mailto:kevinfloframe@gmail.com" style={{ color: 'var(--muted)' }}>Email</a>
      </div>
    </footer>
  )
}
