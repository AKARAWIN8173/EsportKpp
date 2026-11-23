import React from 'react'
import { Crosshair, Trophy, Users } from 'lucide-react'

export default function TournamentOverview() {
  return (
    <section id="overview" className="wrap content-section" aria-labelledby="overview-title">
      <div className="section-heading"><p className="eyebrow">TOURNAMENT OVERVIEW</p><h2 id="overview-title">ภาพรวมการแข่งขัน</h2></div>
      <div className="grid gap-4 md:grid-cols-3">
        {[[Users, 'รวมทีมลงสนาม', 'เตรียมทีมและแบ่งบทบาทผู้เล่นให้พร้อมก่อนเปิดรับสมัคร'], [Crosshair, 'ฝึกซ้อมเพื่อรอบคัดเลือก', 'วางแผนการเล่น ซ้อมสื่อสาร และติดตามกติกาที่จะประกาศ'], [Trophy, 'ชิงแชมป์ลีก', 'ติดตามเส้นทางสู่รอบชิงชนะเลิศและช่องทางรับชมการแข่งขัน']].map(([Icon, title, description]) =>
          <article key={title} className="overview-card"><Icon size={28} /><h3>{title}</h3><p>{description}</p></article>
        )}
      </div>
    </section>
  )
}
