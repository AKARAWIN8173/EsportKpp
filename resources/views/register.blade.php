@extends('layouts.app')

@section('title', 'สมัครนักกีฬา — ACADEMY LEAGUE 2027')

@section('content')
@php
  $shapes = [
    ['triangle', 4, 3, 54], ['circle', 90, 8, 42], ['plus', 2, 15, 30], ['square', 94, 20, 58],
    ['circle', 8, 26, 38], ['triangle', 88, 31, 64], ['square', 3, 37, 35], ['plus', 95, 42, 40],
    ['triangle', 10, 48, 48], ['circle', 87, 53, 33], ['plus', 4, 58, 55], ['square', 93, 63, 37],
    ['circle', 8, 69, 60], ['triangle', 89, 74, 43], ['square', 3, 79, 52], ['plus', 95, 84, 31],
    ['triangle', 11, 89, 36], ['circle', 86, 93, 50], ['plus', 5, 97, 38], ['square', 94, 98, 44],
  ];
@endphp
<main class="register-page content-section" aria-labelledby="register-title">
  <div class="register-floating-shapes" aria-hidden="true">
    @foreach($shapes as [$type, $x, $y, $size])
      <svg class="shape" viewBox="0 0 64 64" data-x="{{ $x }}" data-y="{{ $y }}" data-size="{{ $size }}" style="--x:{{ $x }}%;--y:{{ $y }}%;--size:{{ $size }}px;--duration:{{ 9 + $loop->index % 9 }}s;--delay:-{{ $loop->index % 8 }}s">
        @if($type === 'circle') <circle cx="32" cy="32" r="25" /> @endif
        @if($type === 'square') <rect x="9" y="9" width="46" height="46" /> @endif
        @if($type === 'triangle') <path d="M32 8 59 55H5Z" /> @endif
        @if($type === 'plus') <path d="M32 8v48M8 32h48" /> @endif
      </svg>
    @endforeach
  </div>
  <div class="wrap register-wrap">
    <h1 id="register-title">สมัครนักกีฬา</h1>
    <div class="register-subtitle"><p>ACADEMY ลีก 2027</p><a href="{{ url('/#schedule') }}">← กลับไปยังกำหนดการ</a></div>
    <form id="registration-form" class="registration-form" action="{{ route('register-team.store') }}" method="post" enctype="multipart/form-data" novalidate>
      @csrf
      <div id="form-errors" class="form-errors" role="alert" hidden></div>
      <fieldset class="team-fields">
        <legend>ข้อมูลทีม</legend>
        <div class="field-grid">
          <label>ชื่อทีม <span class="required">*</span><input id="team-name" name="team-name" required></label>
          <label>ชื่อย่อทีม <span class="required">*</span><input id="team-tag" name="team-tag" required></label>
          <label>คำอ่านชื่อทีม <span class="required">*</span><input id="team-pronunciation" name="team-pronunciation" required><small>ตัวอย่าง: เอ-คา-เด-มี</small></label>
          <label>โลโก้ทีม<input id="team-logo" name="team-logo" type="file" accept="image/png,image/jpeg,image/webp" data-max-bytes="1073741824"><small>อัปโหลดได้ 1 ไฟล์ ขนาดสูงสุด 1 GB · รองรับ PNG, JPG, WebP · ขนาดภาพแนะนำ 500 x 500 px</small></label>
        </div>
      </fieldset>
      <section class="roster-section" aria-labelledby="players-title">
        <h2 id="players-title">ผู้เล่นหลัก 5 คน</h2>
        <div id="main-players" class="player-list">
          @for($index = 1; $index <= 5; $index++)
            @include('partials.player', ['index' => $index])
          @endfor
        </div>
      </section>
      <section class="roster-section" aria-labelledby="substitutes-title">
        <h2 id="substitutes-title">ผู้เล่นคนที่ 6 <small>(ตัวสำรอง ไม่บังคับ)</small></h2>
        <div id="substitute-players" class="player-list" hidden>
          @include('partials.player', ['index' => 6])
        </div>
        <button id="toggle-substitute" type="button" class="button roster-action roster-action-add" aria-expanded="false" aria-controls="substitute-players">+ เพิ่มตัวสำรอง</button>
      </section>
      <div class="form-end">
        <label class="pdpa-label">
          <input id="pdpa-consent" class="pdpa-input" type="checkbox" name="pdpa-consent" required>
          <span class="pdpa-indicator" aria-hidden="true">✓</span>
          <span>รับทราบและยินยอมให้ใช้ข้อมูลเพื่อสมัครและจัดการแข่งขัน (PDPA) <span class="required">*</span></span>
        </label>
        <details class="pdpa-details">
          <summary>อ่านเพิ่มเติมเกี่ยวกับการใช้ข้อมูล <span aria-hidden="true">⌄</span></summary>
          <div class="pdpa-details-content">
            <p>สมาคมกีฬาอีสปอร์ตจังหวัดกำแพงเพชรขอข้อมูลทีม ชื่อและข้อมูลการศึกษาของผู้เล่น ชื่อในเกม UID และโลโก้ทีม เพื่อรับสมัคร ตรวจสอบคุณสมบัติ จัดการแข่งขัน และติดต่อประสานงานกับทีม</p>
            <p>ข้อมูลที่ส่งจะใช้ตามวัตถุประสงค์ข้างต้นและเก็บรักษาเท่าที่จำเป็นต่อการดำเนินงาน หากต้องการสอบถามเกี่ยวกับข้อมูลของคุณ หรือขอใช้สิทธิด้านข้อมูลส่วนบุคคล ติดต่อ <a href="mailto:kppesports@gmail.com">kppesports@gmail.com</a> หรือโทร <a href="tel:+66947044144">0947044144</a></p>
          </div>
        </details>
        <button class="button registration-submit" type="submit" disabled>ส่งแบบฟอร์ม</button>
        <p id="registration-status" class="registration-status" role="status" hidden></p>
      </div>
    </form>
  </div>
</main>
@endsection
