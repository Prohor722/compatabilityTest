<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    return "Welcome To Test Page";
});

Route::get('/step-1', function () {
    return view('game.step_1');
})->name('game.step_1');

Route::post('/step-2', function () {
    return view('game.step_2');
})->name('game.step_2');
