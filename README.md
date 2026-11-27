# ACADEMY LEAGUE 2027

เว็บไซต์ Laravel 13 ใช้ Blade, CSS และ JavaScript ธรรมดา ฟอร์มสมัครทีมบันทึกข้อมูลลง MySQL และอัปโหลดโลโก้ลง Laravel public storage

## โครงสร้างหลัก

- `routes/web.php` กำหนดหน้าแรก หน้าติดต่อ หน้าสมัครทีม และ route รับสมัคร
- `app/Http/Controllers/TeamRegistrationController.php` ตรวจและบันทึกข้อมูลสมัครทีม
- `resources/views/` เก็บหน้าเว็บและส่วนประกอบ Blade
- `public/css/site.css` และ `public/js/site.js` เก็บสไตล์และการทำงานฝั่งเบราว์เซอร์
- `database/migrations/` สร้างตาราง `teams`, `team_members`, `departments`
- `database/seeders/DepartmentSeeder.php` เพิ่มรายการแผนก

## เริ่มใช้งานในเครื่อง

ต้องมี PHP 8.3+, Composer และ MySQL จากนั้นรันในโฟลเดอร์โปรเจกต์:

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
```

สร้างฐานข้อมูล MySQL ชื่อ `esport` แล้วแก้ค่า `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` และ `DB_PASSWORD` ใน `.env` ให้ตรงกับเครื่องของคุณ จากนั้นรัน:

```powershell
php artisan migrate
php artisan db:seed --class=DepartmentSeeder
php artisan storage:link
php artisan serve
```

เปิด `http://127.0.0.1:8000/?page=register_team` เพื่อสมัครทีม

หากต้องการย้าย **ข้อมูลจริง** จากเครื่องเดิม ให้นำเข้าไฟล์ SQL ที่สำรองไว้แทนการสร้างตารางใหม่ แล้วคัดลอกไฟล์โลโก้ไปที่ `storage/app/public/team-logos` โดยคงชื่อไฟล์เดิม หลังจากนั้นรัน `php artisan storage:link`

`.env`, ไฟล์โลโก้ที่อัปโหลด, `vendor` และไฟล์แคชไม่ถูกนำขึ้น GitHub อย่าเผยแพร่ไฟล์ SQL ที่มีข้อมูลผู้สมัครเป็นสาธารณะ

Laravel ต้องใช้เซิร์ฟเวอร์ PHP และ MySQL; GitHub Pages ไม่สามารถรันแอปนี้ได้
