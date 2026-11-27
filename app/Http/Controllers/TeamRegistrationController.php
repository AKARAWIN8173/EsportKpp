<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use RuntimeException;
use Throwable;

class TeamRegistrationController extends Controller
{
    private const SECONDARY_DEPARTMENT = 'มัธยมศึกษา (ไม่สังกัดแผนก)';

    private const STUDY_LEVELS = [
        'ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6',
        'ปวช.1', 'ปวช.2', 'ปวช.3', 'ปวส.1', 'ปวส.2',
    ];

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $departments = DB::table('departments')->pluck('department_id', 'department_name');
        $selectableDepartments = $departments->keys()
            ->reject(fn (string $name) => $name === self::SECONDARY_DEPARTMENT)
            ->all();

        $rules = [
            'team-name' => ['required', 'string', 'max:100', Rule::unique('teams', 'team_name')],
            'team-tag' => ['required', 'string', 'max:10'],
            'team-pronunciation' => ['required', 'string', 'max:150'],
            'team-logo' => ['nullable', 'file', 'mimetypes:image/png,image/jpeg,image/webp', 'max:1048576'],
            'pdpa-consent' => ['accepted'],
            'players' => ['required', 'array'],
        ];

        $attributes = [
            'team-name' => 'ชื่อทีม',
            'team-tag' => 'ชื่อย่อทีม',
            'team-pronunciation' => 'คำอ่านชื่อทีม',
            'team-logo' => 'โลโก้ทีม',
            'pdpa-consent' => 'การยินยอม PDPA',
        ];

        $reserve = $request->input('players.6');
        $hasReserve = is_array($reserve) && collect($reserve)
            ->contains(fn ($value) => is_string($value) && trim($value) !== '');

        foreach (range(1, $hasReserve ? 6 : 5) as $slot) {
            $prefix = "players.$slot";
            $secondary = in_array($request->input("$prefix.year"), array_slice(self::STUDY_LEVELS, 0, 6), true);

            $rules[$prefix] = ['required', 'array'];
            $rules["$prefix.first_name"] = ['required', 'string', 'max:80'];
            $rules["$prefix.last_name"] = ['required', 'string', 'max:80'];
            $rules["$prefix.year"] = ['required', 'string', Rule::in(self::STUDY_LEVELS)];
            $rules["$prefix.department"] = $secondary
                ? ['nullable']
                : ['required', 'string', Rule::in($selectableDepartments)];
            $rules["$prefix.game_name"] = ['required', 'string', 'max:80'];
            $rules["$prefix.uid"] = [
                'required', 'string', 'max:30',
                Rule::unique('team_members', 'game_uid'),
            ];
            $rules["$prefix.pronunciation"] = ['nullable', 'string', 'max:150'];

            foreach ([
                'first_name' => 'ชื่อ', 'last_name' => 'นามสกุล', 'year' => 'ชั้นปี',
                'department' => 'แผนก', 'game_name' => 'ชื่อในเกม',
                'uid' => 'UID', 'pronunciation' => 'คำอ่านชื่อ',
            ] as $field => $label) {
                $attributes["$prefix.$field"] = "$label คนที่ $slot";
            }
        }

        $validated = $request->validate($rules, [
            'required' => 'กรุณากรอก :attribute',
            'accepted' => 'กรุณายินยอมก่อนส่งแบบฟอร์ม',
            'in' => 'กรุณาเลือก :attribute จากรายการ',
            'unique' => ':attribute นี้ถูกใช้แล้ว',
            'max.string' => ':attribute ต้องไม่เกิน :max ตัวอักษร',
            'max.file' => ':attribute ต้องมีขนาดไม่เกิน 1 GB',
            'mimetypes' => ':attribute ต้องเป็นไฟล์ PNG, JPG หรือ WebP',
        ], $attributes);

        $seenUids = [];
        foreach (range(1, $hasReserve ? 6 : 5) as $slot) {
            $uid = strtolower($validated['players'][$slot]['uid']);
            if (isset($seenUids[$uid])) {
                throw ValidationException::withMessages([
                    "players.$slot.uid" => "UID คนที่ $slot ซ้ำกับคนที่ {$seenUids[$uid]}",
                ]);
            }
            $seenUids[$uid] = $slot;
        }

        $logoPath = null;

        try {
            if ($request->hasFile('team-logo')) {
                $logoPath = $request->file('team-logo')->store('team-logos', 'public');
                if ($logoPath === false) {
                    throw new RuntimeException('Could not store the team logo.');
                }
            }

            DB::transaction(function () use ($validated, $departments, $hasReserve, $logoPath): void {
                $teamId = DB::table('teams')->insertGetId([
                    'team_name' => $validated['team-name'],
                    'team_short' => $validated['team-tag'],
                    'team_phonetic' => $validated['team-pronunciation'],
                    'logo_path' => $logoPath,
                    'created_at' => now(),
                ], 'team_id');

                foreach (range(1, $hasReserve ? 6 : 5) as $slot) {
                    $player = $validated['players'][$slot];
                    $secondary = in_array($player['year'], array_slice(self::STUDY_LEVELS, 0, 6), true);
                    $departmentName = $secondary
                        ? self::SECONDARY_DEPARTMENT
                        : $player['department'];
                    $departmentId = $departments->get($departmentName);
                    if ($departmentId === null) {
                        throw new RuntimeException('Department record is missing.');
                    }

                    DB::table('team_members')->insert([
                        'team_id' => $teamId,
                        'slot_no' => $slot,
                        'first_name' => $player['first_name'],
                        'last_name' => $player['last_name'],
                        'study_level' => $player['year'],
                        'department_id' => $departmentId,
                        'name_phonetic' => $player['pronunciation'] ?? null,
                        'ingame_name' => $player['game_name'],
                        'game_uid' => $player['uid'],
                    ]);
                }
            });
        } catch (Throwable $exception) {
            if ($logoPath !== null) {
                Storage::disk('public')->delete($logoPath);
            }
            throw $exception;
        }

        $message = 'สมัครทีมสำเร็จ ระบบบันทึกข้อมูลทีมและผู้เล่นแล้ว';

        return $request->expectsJson()
            ? response()->json(['message' => $message], 201)
            : redirect('/?page=register_team')->with('registration_success', $message);
    }
}
