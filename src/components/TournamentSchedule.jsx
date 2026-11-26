import React from 'react'
import { CalendarDays } from 'lucide-react'

const stages = [
  ['รับสมัครทีม', 'เตรียมรายชื่อผู้เล่นและทดลองกรอกแบบฟอร์มสมัครนักกีฬา', '?page=register_team'],
  ['รอบคัดเลือก', 'รายละเอียดการแข่งขันและการจัดสายจะแจ้งพร้อมกติกา'],
  ['รอบชิงชนะเลิศ', 'ติดตามวันแข่งขันและช่องทางรับชมจากประกาศของลีก'],
]

export default function TournamentSchedule() {
  return (
    <section id="schedule" className="schedule-section" aria-labelledby="schedule-title">
      <div className="wrap content-section">
        <div className="section-heading"><p className="eyebrow">TOURNAMENT SCHEDULE</p><h2 id="schedule-title">กำหนดการ</h2></div>
        <ol className="schedule-list">
          {stages.map(([title, description, href]) => <li key={title}>
            <CalendarDays size={22} className="schedule-icon" />
            <div><h3>{title}</h3><p>{description}</p></div>
            {href ? (
              <a className="schedule-register" href={href} aria-label="สมัครทีม แบบฟอร์มสมัครนักกีฬา">สมัครทีม</a>
            ) : <span className="status">รอประกาศ</span>}
          </li>)}
        </ol>
      </div>
    </section>
  )
}
