@php($home = url('/'))
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-top">
      <section id="association" class="association" aria-labelledby="association-title">
        <a class="brand" href="{{ $home }}#home" aria-label="กลับหน้าหลัก"><img src="{{ asset('kppesport.png') }}" width="208" height="250" alt=""></a>
        <div>
          <p class="eyebrow">KAMPHAENG PHET ESPORTS ASSOCIATION</p>
          <h2 id="association-title">สมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร</h2>
          <p>มุ่งพัฒนานักกีฬาอีสปอร์ตจังหวัดกำแพงเพชรอย่างเป็นระบบ โปร่งใส และพร้อมต่อยอดสู่การแข่งขันระดับจังหวัด ระดับชาติ และเยาวชนแห่งชาติ</p>
        </div>
      </section>
      <nav aria-labelledby="footer-menu-title">
        <h2 id="footer-menu-title">เมนูสำคัญ</h2>
        <ul class="footer-links">
          <li><a href="{{ $home }}#home">หน้าแรก</a></li>
          <li><a href="{{ $home }}#association">เกี่ยวกับเรา</a></li>
          <li><a href="{{ $home }}#schedule">รายการแข่งขัน</a></li>
          <li class="muted">รายชื่อทีม</li>
          <li class="muted">ขึ้นทะเบียนนักกีฬา</li>
          <li><a href="{{ $home }}?page=contact">ติดต่อเรา</a></li>
        </ul>
      </nav>
    </div>
    <section class="partners" aria-labelledby="partners-title">
      <h2 id="partners-title">ผู้สนับสนุนและเครือข่ายกีฬา</h2>
      <ul>
        <li>สมาคมกีฬา</li>
        <li>สมาคมกีฬาแห่ง จังหวัดกำแพงเพชร</li>
        <li>การกีฬาแห่งประเทศไทย</li>
        <li>สมาคมกีฬาอีสปอร์ตแห่งประเทศไทย</li>
      </ul>
    </section>
    <div class="footer-bottom"><strong>สมาคมกีฬาอีสปอร์ต จังหวัดกำแพงเพชร</strong><p>© 2021-2026 iplaycomputer | สงวนลิขสิทธิ์</p></div>
  </div>
</footer>
