import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/" className="nav-logo">Kevin Flo Frame</Link>
      <ul className="nav-links">
        <li><Link href="/portfolio">Portfolio</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <a className="nav-book" href="/book">Book</a>
    </nav>
  )
}
