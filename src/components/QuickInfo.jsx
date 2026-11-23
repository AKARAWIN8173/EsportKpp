import React from 'react'
import { CalendarDays, Gamepad2, Trophy } from 'lucide-react'

export default function QuickInfo() {
  return (
    <div className="quick-info">
      <div className="wrap grid grid-cols-1 sm:grid-cols-3">
        {[[CalendarDays, 'การรับสมัคร', 'รอประกาศวันเปิดรับสมัคร'], [Gamepad2, 'เกมที่แข่งขัน', 'รอประกาศรายชื่อเกม'], [Trophy, 'รอบชิงชนะเลิศ', 'รอประกาศกำหนดการ']].map(([Icon, title, description]) =>
          <div className="quick-item" key={title}><span className="quick-icon"><Icon size={23} /></span><div><h2>{title}</h2><p>{description}</p></div></div>
        )}
      </div>
    </div>
  )
}
