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

Route::get('/step-2', function () {
    return view('game.step_2');
})->name('game.step_2');

Route::get('/step-3', function () {
    return view('game.step_3');
})->name('game.step_3');

Route::get('/step-4', function () {
    return view('game.step_4');
})->name('game.step_4');

Route::get('/join-page', function () {
    return view('game.join_page');
})->name('game.join_page');