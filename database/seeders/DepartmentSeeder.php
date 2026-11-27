<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $names = [
            'ช่างยนต์',
            'ช่างกลโรงงาน',
            'ช่างเชื่อมโลหะ',
            'เทคนิคอุตสาหกรรม',
            'ช่างไฟฟ้ากำลัง',
            'ช่างอิเล็กทรอนิกส์',
            'ช่างก่อสร้าง',
            'สถาปัตยกรรม',
            'เมคคาทรอนิกส์',
            'การบัญชี',
            'การตลาด',
            'การจัดการสำนักงาน',
            'ธุรกิจคหกรรม',
            'เทคโนโลยีสารสนเทศ',
            'เทคโนโลยีธุรกิจดิจิทัล',
        ];

        DB::table('departments')->insertOrIgnore(
            array_map(fn (string $name) => ['department_name' => $name], $names)
        );
    }
}
