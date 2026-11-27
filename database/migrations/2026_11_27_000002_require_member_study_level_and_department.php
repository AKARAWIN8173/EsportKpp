<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Secondary school players do not select a department in the form,
        // but every member must still reference a department row.
        DB::table('departments')->insertOrIgnore([
            'department_name' => 'มัธยมศึกษา (ไม่สังกัดแผนก)',
        ]);

        Schema::table('team_members', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->string('study_level', 20)->nullable(false)->change();
            $table->unsignedInteger('department_id')->nullable(false)->change();
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->foreign('department_id')->references('department_id')->on('departments');
        });
    }

    public function down(): void
    {
        Schema::table('team_members', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->string('study_level', 20)->nullable()->change();
            $table->unsignedInteger('department_id')->nullable()->change();
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->foreign('department_id')->references('department_id')->on('departments');
        });
    }
};
