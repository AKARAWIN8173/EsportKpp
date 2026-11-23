import React from 'react'

export default function Brand({ homePath = '' }) {
  return (
    <a href={homePath + '#home'} className="inline-flex shrink-0" aria-label="KPP Esport – หน้าหลัก ACADEMY League 2027">
      <img src={import.meta.env.BASE_URL + 'kppesport.png'} alt="" width={208} height={250} className="h-14 w-auto" />
    </a>
  )
}
