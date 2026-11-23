import React from 'react'
import { ChevronDown } from 'lucide-react'

const questions = [
  ['เปิดรับสมัครเมื่อไหร่?', 'กำหนดการรับสมัครอยู่ระหว่างรอประกาศ ตรวจสอบสถานะล่าสุดได้ในส่วนกำหนดการ'],
  ['ใช้เกมอะไรในการแข่งขัน?', 'รายชื่อเกมจะแจ้งพร้อมกติกาของ ACADEMY ลีก 2027'],
  ['ต้องมีผู้เล่นกี่คนต่อทีม?', 'จำนวนผู้เล่นและเงื่อนไขของทีมจะระบุในกติกาของแต่ละเกม'],
]

export default function Faq() {
  return (
    <section id="faq" className="wrap content-section faq-section" aria-labelledby="faq-title">
      <div className="section-heading"><p className="eyebrow">FAQ</p><h2 id="faq-title">คำถามที่พบบ่อย</h2></div>
      <div className="faq-list">
        {questions.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}
      </div>
    </section>
  )
}
