import React from 'react'
import { Facebook, Mail, Phone } from 'lucide-react'

const email = 'kppesports@gmail.com'
const phone = '0947044144'
const associationName = 'สมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร'
const facebookSearch = 'https://www.facebook.com/KPPeSports'
const fieldClass = 'mt-2 w-full border border-[var(--line)] bg-[#08090e] px-3 py-2.5 text-base'

function openEmailDraft(event) {
  event.preventDefault()

  const fields = new FormData(event.currentTarget)
  const subject = fields.get('subject').trim() || 'ติดต่อสมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร'
  const body = [
    'ชื่อ: ' + fields.get('name').trim(),
    'อีเมล: ' + fields.get('email').trim(),
    '',
    fields.get('message').trim(),
  ].join('\r\n')

  window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
}

export default function ContactPage() {
  return (
    <main className="wrap content-section" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="eyebrow">CONTACT</p>
        <h1 id="contact-title" className="mt-2 text-3xl leading-tight font-bold sm:text-5xl">ติดต่อ แนะนำ ติชม</h1>
      </div>

      <div className="grid gap-8 border border-[var(--line)] border-t-2 border-t-[var(--red)] bg-[#10111b] p-5 sm:p-8 lg:grid-cols-[1fr_2fr]">
        <section aria-labelledby="contact-association-title">
          <h2 id="contact-association-title" className="text-xl font-bold">{associationName}</h2>
          <p className="mt-2 text-[var(--muted)]">เรามุ่งมั่นพัฒนานักเล่นเกมส์ สู่การเป็นนักกีฬามืออาชีพ</p>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="font-bold">อีเมล</dt>
              <dd><a className="inline-flex items-center gap-2 break-all text-blue-300 hover:underline" href={'mailto:' + email}><Mail size={17} aria-hidden="true" />{email}</a></dd>
            </div>
            <div>
              <dt className="font-bold">โทรศัพท์</dt>
              <dd><a className="inline-flex items-center gap-2 text-blue-300 hover:underline" href={'tel:+66' + phone.slice(1)}><Phone size={17} aria-hidden="true" />{phone}</a></dd>
            </div>
          </dl>

          <a className="mt-6 inline-flex items-center gap-2 border border-blue-500 bg-blue-950/40 px-3 py-2.5 font-semibold text-blue-100 hover:bg-blue-900/60" href={facebookSearch} target="_blank" rel="noopener noreferrer">
            <Facebook size={18} className="shrink-0" aria-hidden="true" /> สมาคมกีฬาอีสปอร์ตจังหวัดกำแพงเพชร
          </a>
        </section>

        <form className="grid min-w-0 gap-4" onSubmit={openEmailDraft} aria-describedby="contact-form-help">
          <label className="font-semibold">
            หัวข้อ
            <input className={fieldClass} name="subject" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="min-w-0 font-semibold">
              ชื่อ <span className="text-red-400" aria-hidden="true">*</span>
              <input className={fieldClass} name="name" autoComplete="name" required />
            </label>
            <label className="min-w-0 font-semibold">
              อีเมล <span className="text-red-400" aria-hidden="true">*</span>
              <input className={fieldClass} name="email" type="email" autoComplete="email" required />
            </label>
          </div>

          <label className="font-semibold">
            ข้อความ <span className="text-red-400" aria-hidden="true">*</span>
            <textarea className={fieldClass} name="message" rows={5} placeholder="กรุณากรอกรายละเอียดที่นี่" required />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button className="button button-primary cursor-pointer" type="submit">เปิดแอปอีเมล</button>
            <p id="contact-form-help" className="text-sm text-[var(--muted)]">ตรวจสอบข้อความและกดส่งในแอปอีเมลของคุณ</p>
          </div>
        </form>
      </div>
    </main>
  )
}

