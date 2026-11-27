@php($home = url('/'))
<header class="site-header" id="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="{{ $home }}#home" aria-label="KPP Esport – หน้าหลัก ACADEMY League 2027">
      <img src="{{ asset('kppesport.png') }}" width="208" height="250" alt="">
    </a>
    <button class="menu-toggle" id="menu-toggle" type="button" aria-label="เปิดเมนู" aria-expanded="false" aria-controls="main-nav">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" id="main-nav" aria-label="เมนูหลัก">
      <a href="{{ $home }}#home" @if(!request()->query('page')) aria-current="page" @endif>หน้าหลัก</a>
      <a href="{{ $home }}#overview">ภาพรวมการแข่งขัน</a>
      <a href="{{ $home }}#schedule">กำหนดการ</a>
      <a href="{{ $home }}#faq">คำถามที่พบบ่อย</a>
      <a href="{{ $home }}?page=contact" @if(request()->query('page') === 'contact') aria-current="page" @endif>ติดต่อเรา</a>
    </nav>
    <a class="button button-header" href="{{ $home }}#schedule">สถานะการสมัคร</a>
  </div>
</header>
