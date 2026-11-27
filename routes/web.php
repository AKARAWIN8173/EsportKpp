<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamRegistrationController;

Route::get('/', function (Request $request) {
    $page = $request->query('page');

    return match ($page) {
        'contact' => view('contact'),
        'register_team' => view('register'),
        default => view('home'),
    };
});

Route::post('/register-team', [TeamRegistrationController::class, 'store'])
    ->name('register-team.store');
