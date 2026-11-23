import React from 'react'
import Brand from './Brand.jsx'

const associationName = 'สมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร'

const mainLinks = [
  ['หน้าแรก', '#home'],
  ['เกี่ยวกับเรา', '#association'],
  ['รายการแข่งขัน', '#schedule'],
  ['รายชื่อทีม'],
  ['ขึ้นทะเบียนนักกีฬา'],
  ['ติดต่อเรา', '?page=contact'],
]

const partners = [
  'สมาคมกีฬา',
  'สมาคมกีฬาแห่ง จังหวัดกำแพงเพชร',
  'การกีฬาแห่งประเทศไทย',
  'สมาคมกีฬาอีสปอร์ตแห่งประเทศไทย',
]

function FooterLinks({ items, homePath }) {
  return items.map(([label, href]) => (
    <li key={label}>
      {href ? <a className="font-semibold hover:text-red-400" href={href === '#home' || href === '#schedule' ? homePath + href : href}>{label}</a> : <span className="text-[var(--muted)]">{label}</span>}
    </li>
  ))
}

export default function SiteFooter({ homePath }) {
  return (
    <footer className="site-footer">
      <div className="wrap py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <section id="association" className="flex flex-wrap items-start gap-4 sm:flex-nowrap" aria-labelledby="association-title">
            <Brand homePath={homePath} />
            <div>
              <p className="eyebrow footer-eyebrow">KAMPHAENG PHET ESPORTS ASSOCIATION</p>
              <h2 id="association-title" className="mt-1 text-xl font-bold sm:text-2xl">{associationName}</h2>
              <p className="mt-2 max-w-2xl text-base">มุ่งพัฒนานักกีฬาอีสปอร์ตจังหวัดกำแพงเพชรอย่างเป็นระบบ โปร่งใส และพร้อมต่อยอดสู่การแข่งขันระดับจังหวัด ระดับชาติ และเยาวชนแห่งชาติ</p>
            </div>
          </section>

          <nav aria-labelledby="footer-menu-title">
            <h2 id="footer-menu-title" className="mb-3 text-lg font-bold">เมนูสำคัญ</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              <FooterLinks items={mainLinks} homePath={homePath} />
            </ul>
          </nav>
        </div>

        <section className="mt-8 border-t border-[var(--line)] pt-6" aria-labelledby="partners-title">
          <h2 id="partners-title" className="mb-3 text-lg font-bold">ผู้สนับสนุนและเครือข่ายกีฬา</h2>
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map(partner => (
              <li key={partner} className="flex items-center border border-[var(--line)] border-l-[var(--blue)] bg-[#10111b] px-3 py-2.5 font-semibold">
                {partner}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-7 border-t border-[var(--line)] pt-5">
          <strong>{associationName}</strong>
          <p className="mt-1">© 2021-2026 iplaycomputer | สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  )
}
