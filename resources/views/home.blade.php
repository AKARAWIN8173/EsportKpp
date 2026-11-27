@extends('layouts.app')

@section('content')
<main id="home">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-image" aria-hidden="true"></div>
    <div class="wrap hero-body">
      <div class="hero-copy">
        <p class="eyebrow hero-kicker"><span></span> THE NEXT GENERATION OF ESPORTS</p>
        <h1 id="hero-title"><span>ACADEMY</span><span class="league">LEAGUE <em>2027</em></span></h1>
        <p class="hero-tagline">สนามประลองของนักแข่งรุ่นใหม่</p>
        <p class="hero-description">รวมทีม ฝึกซ้อม และเตรียมลงสนามกับ ACADEMY ลีก 2027</p>
        <div class="hero-actions"><a class="button button-primary" href="#schedule">ดูกำหนดการ</a><a class="button button-outline" href="#overview">รายละเอียดการแข่งขัน</a></div>
      </div>
    </div>
  </section>

  <section id="overview" class="wrap content-section" aria-labelledby="overview-title">
    <div class="section-heading"><p class="eyebrow">TOURNAMENT OVERVIEW</p><h2 id="overview-title">ภาพรวมการแข่งขัน</h2></div>
    <div class="overview-grid">
      <article class="overview-card"><span class="card-symbol" aria-hidden="true">◎</span><h3>รวมทีมลงสนาม</h3><p>เตรียมทีมและแบ่งบทบาทผู้เล่นให้พร้อมก่อนเปิดรับสมัคร</p></article>
      <article class="overview-card"><span class="card-symbol" aria-hidden="true">✦</span><h3>ฝึกซ้อมเพื่อรอบคัดเลือก</h3><p>วางแผนการเล่น ซ้อมสื่อสาร และติดตามกติกาที่จะประกาศ</p></article>
      <article class="overview-card"><span class="card-symbol" aria-hidden="true">★</span><h3>ชิงแชมป์ลีก</h3><p>ติดตามเส้นทางสู่รอบชิงชนะเลิศและช่องทางรับชมการแข่งขัน</p></article>
    </div>
  </section>

  <section id="schedule" class="schedule-section" aria-labelledby="schedule-title">
    <div class="wrap content-section">
      <div class="section-heading"><p class="eyebrow">TOURNAMENT SCHEDULE</p><h2 id="schedule-title">กำหนดการ</h2></div>
      <ol class="schedule-list">
        <li><span class="schedule-icon" aria-hidden="true">◇</span><div><h3>รับสมัครทีม</h3><p>เตรียมรายชื่อผู้เล่นและทดลองกรอกแบบฟอร์มสมัครนักกีฬา</p></div><a class="schedule-register" href="{{ url('/?page=register_team') }}" aria-label="สมัครทีม แบบฟอร์มสมัครนักกีฬา">สมัครทีม</a></li>
        <li><span class="schedule-icon" aria-hidden="true">◇</span><div><h3>รอบคัดเลือก</h3><p>รายละเอียดการแข่งขันและการจัดสายจะแจ้งพร้อมกติกา</p></div><span class="status">รอประกาศ</span></li>
        <li><span class="schedule-icon" aria-hidden="true">◇</span><div><h3>รอบชิงชนะเลิศ</h3><p>ติดตามวันแข่งขันและช่องทางรับชมจากประกาศของลีก</p></div><span class="status">รอประกาศ</span></li>
      </ol>
    </div>
  </section>

  <section id="faq" class="wrap content-section faq-section" aria-labelledby="faq-title">
    <div class="section-heading"><p class="eyebrow">FAQ</p><h2 id="faq-title">คำถามที่พบบ่อย</h2></div>
    <div class="faq-list">
      <details><summary>เปิดรับสมัครเมื่อไหร่?<span aria-hidden="true">⌄</span></summary><p>กำหนดการรับสมัครอยู่ระหว่างรอประกาศ ตรวจสอบสถานะล่าสุดได้ในส่วนกำหนดการ</p></details>
      <details><summary>ใช้เกมอะไรในการแข่งขัน?<span aria-hidden="true">⌄</span></summary><p>รายชื่อเกมจะแจ้งพร้อมกติกาของ ACADEMY ลีก 2027</p></details>
      <details><summary>ต้องมีผู้เล่นกี่คนต่อทีม?<span aria-hidden="true">⌄</span></summary><p>จำนวนผู้เล่นและเงื่อนไขของทีมจะระบุในกติกาของแต่ละเกม</p></details>
    </div>
  </section>
</main>
@endsection
