import React from 'react'
import { CalendarDays } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true"></div>
      <div className="wrap hero-body">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span></span> THE NEXT GENERATION OF ESPORTS</p>
          <h1 id="hero-title"><span>ACADEMY</span><span className="league">LEAGUE <em>2027</em></span></h1>
          <p className="hero-tagline">สนามประลองของนักแข่งรุ่นใหม่</p>
          <p className="hero-description">รวมทีม ฝึกซ้อม และเตรียมลงสนามกับ ACADEMY ลีก 2027</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button button-primary" href="#schedule"><CalendarDays size={18} /> ดูกำหนดการ</a>
            <a className="button button-outline" href="#overview">รายละเอียดการแข่งขัน</a>
          </div>
        </div>
      </div>
    </section>
  )
}
