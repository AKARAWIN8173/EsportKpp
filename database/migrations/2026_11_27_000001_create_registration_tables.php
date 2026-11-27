<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->increments('team_id');
            $table->string('team_name', 100)->unique();
            $table->string('team_short', 10);
            $table->string('team_phonetic', 150);
            $table->string('logo_path', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('departments', function (Blueprint $table) {
            $table->increments('department_id');
            $table->string('department_name', 100)->unique();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->increments('member_id');
            $table->unsignedInteger('team_id');
            $table->unsignedTinyInteger('slot_no');
            $table->boolean('is_substitute')->storedAs('`slot_no` = 6');
            $table->string('first_name', 80);
            $table->string('last_name', 80);
            $table->string('study_level', 20)->nullable();
            $table->unsignedInteger('department_id')->nullable();
            $table->string('name_phonetic', 150)->nullable();
            $table->string('ingame_name', 80);
            $table->string('game_uid', 30)->unique();

            $table->unique(['team_id', 'slot_no']);
            $table->foreign('team_id')->references('team_id')->on('teams')->cascadeOnDelete();
            $table->foreign('department_id')->references('department_id')->on('departments');
        });

        DB::statement('ALTER TABLE team_members ADD CONSTRAINT team_members_slot_no_check CHECK (slot_no BETWEEN 1 AND 6)');
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('teams');
    }
};
