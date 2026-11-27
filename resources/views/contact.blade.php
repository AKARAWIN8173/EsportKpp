@extends('layouts.app')

@section('title', 'ติดต่อเรา — ACADEMY LEAGUE 2027')

@section('content')
<main class="wrap content-section contact-page" aria-labelledby="contact-title">
  <div class="section-heading"><p class="eyebrow">CONTACT</p><h1 id="contact-title">ติดต่อ แนะนำ ติชม</h1></div>
  <div class="contact-panel">
    <section aria-labelledby="contact-association-title">
      <h2 id="contact-association-title">สมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร</h2>
      <p class="muted">เรามุ่งมั่นพัฒนานักเล่นเกมส์ สู่การเป็นนักกีฬามืออาชีพ</p>
      <dl class="contact-details">
        <div><dt>อีเมล</dt><dd><a href="mailto:kppesports@gmail.com">kppesports@gmail.com</a></dd></div>
        <div><dt>โทรศัพท์</dt><dd><a href="tel:+66947044144">0947044144</a></dd></div>
      </dl>
      <a class="facebook-link" href="https://www.facebook.com/KPPeSports" target="_blank" rel="noopener noreferrer">สมาคมกีฬาอีสปอร์ตจังหวัดกำแพงเพชร ↗</a>
    </section>
    <form id="contact-form" class="contact-form" aria-describedby="contact-form-help">
      <label>หัวข้อ<input name="subject" type="text"></label>
      <div class="field-grid">
        <label>ชื่อ <span class="required">*</span><input name="name" autocomplete="name" required></label>
        <label>อีเมล <span class="required">*</span><input name="email" type="email" autocomplete="email" required></label>
      </div>
      <label>ข้อความ <span class="required">*</span><textarea name="message" rows="5" placeholder="กรุณากรอกรายละเอียดที่นี่" required></textarea></label>
      <div class="contact-actions"><button class="button button-primary" type="submit">เปิดแอปอีเมล</button><p id="contact-form-help" class="muted">ตรวจสอบข้อความและกดส่งในแอปอีเมลของคุณ</p></div>
    </form>
  </div>
</main>
@endsection
