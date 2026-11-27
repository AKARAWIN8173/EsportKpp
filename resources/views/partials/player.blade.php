@php($isReserve = $index === 6)
<fieldset class="player-row" data-player-number="{{ $index }}" @if($isReserve) disabled @endif>
  <legend>คนที่ {{ $index }} @if($isReserve)<small>ตัวสำรอง (ไม่บังคับ)</small>@endif</legend>
  <div class="player-fields field-grid">
    <label>ชื่อ <span class="required">*</span><input id="player-first-{{ $index }}" name="players[{{ $index }}][first_name]" required></label>
    <label>นามสกุล <span class="required">*</span><input id="player-last-{{ $index }}" name="players[{{ $index }}][last_name]" required></label>
      <label>ชั้นปี <span class="required">*</span><select id="player-year-{{ $index }}" name="players[{{ $index }}][year]" required>
        <option value="">เลือกชั้นปี</option>
        <option value="ม.1">ม.1</option>
        <option value="ม.2">ม.2</option>
        <option value="ม.3">ม.3</option>
        <option value="ม.4">ม.4</option>
        <option value="ม.5">ม.5</option>
        <option value="ม.6">ม.6</option>
        <option value="ปวช.1">ปวช.1</option>
        <option value="ปวช.2">ปวช.2</option>
        <option value="ปวช.3">ปวช.3</option>
        <option value="ปวส.1">ปวส.1</option>
        <option value="ปวส.2">ปวส.2</option>
      </select></label>
      <label>แผนก <span class="required">*</span><select id="player-department-{{ $index }}" name="players[{{ $index }}][department]" required>
        <option value="">เลือกแผนก</option>
        <option value="ช่างยนต์">ช่างยนต์</option>
        <option value="ช่างกลโรงงาน">ช่างกลโรงงาน</option>
        <option value="ช่างเชื่อมโลหะ">ช่างเชื่อมโลหะ</option>
        <option value="เทคนิคอุตสาหกรรม">เทคนิคอุตสาหกรรม</option>
        <option value="ช่างไฟฟ้ากำลัง">ช่างไฟฟ้ากำลัง</option>
        <option value="ช่างอิเล็กทรอนิกส์">ช่างอิเล็กทรอนิกส์</option>
        <option value="ช่างก่อสร้าง">ช่างก่อสร้าง</option>
        <option value="สถาปัตยกรรม">สถาปัตยกรรม</option>
        <option value="เมคคาทรอนิกส์">เมคคาทรอนิกส์</option>
        <option value="การบัญชี">การบัญชี</option>
        <option value="การตลาด">การตลาด</option>
        <option value="การจัดการสำนักงาน">การจัดการสำนักงาน</option>
        <option value="ธุรกิจคหกรรม">ธุรกิจคหกรรม</option>
        <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
        <option value="เทคโนโลยีธุรกิจดิจิทัล">เทคโนโลยีธุรกิจดิจิทัล</option>
      </select></label>
    <label>ชื่อในเกม <span class="required">*</span><input id="game-name-{{ $index }}" name="players[{{ $index }}][game_name]" required></label>
    <label>UID <span class="required">*</span><input id="player-uid-{{ $index }}" name="players[{{ $index }}][uid]" required></label>
    <label class="field-wide">คำอ่านชื่อ <small>(กรอกเมื่อชื่ออ่านยาก)</small><input id="player-pronunciation-{{ $index }}" name="players[{{ $index }}][pronunciation]" placeholder="ตัวอย่าง: ณัฐวุฒิ อ่านว่า นัด-ถะ-วุด"></label>
  </div>
</fieldset>
