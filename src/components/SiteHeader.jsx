import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Brand from './Brand.jsx'

const links = [
  ['หน้าหลัก', 'home'],
  ['ภาพรวมการแข่งขัน', 'overview'],
  ['กำหนดการ', 'schedule'],
  ['คำถามที่พบบ่อย', 'faq'],
]

export default function SiteHeader({ homePath, isContactPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
      <div className="wrap flex min-h-[76px] items-center justify-between gap-6">
        <Brand homePath={homePath} />
        <button type="button" className="menu-toggle md:hidden" aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav id="main-nav" aria-label="เมนูหลัก" className={'main-nav ' + (menuOpen ? 'is-open' : '')}>
          {links.map(([label, id]) => <a key={id} href={homePath + '#' + id} onClick={() => setMenuOpen(false)} aria-current={id === 'home' && !homePath ? 'page' : undefined}>{label}</a>)}
          <a href="?page=contact" aria-current={isContactPage ? 'page' : undefined} onClick={() => setMenuOpen(false)}>ติดต่อเรา</a>
        </nav>
        <a className="button button-header hidden md:inline-flex" href={homePath + '#schedule'}>สถานะการสมัคร</a>
      </div>
    </header>
  )
}
