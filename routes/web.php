<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/test', function () {
    return "Welcome To Test Page";
});

Route::get('/step-1/', function() {
    $id = 1;
    return view('game.user1.step_1', compact('id'));
})->name('game.step_1');

Route::get('/step-2', function () {
    $id = 2;
    return view('game.user1.step_2', compact('id'));
})->name('game.step_2');

Route::get('/step-3', function () {
    $id = 3;
    return view('game.user1.step_3', compact('id'));
})->name('game.step_3');

Route::get('/step-4', function () {
    $id = 4;
    return view('game.user1.step_4', compact('id'));
})->name('game.step_4');

Route::get('/join-page', function () {
    $id = 1;
    return view('game.join_page_home', compact('id'));
})->name('game.join_page');

Route::get('/join-page-1', function () {
    $id = 2;
    return view('game.user2.join_page_1', compact('id'));
})->name('game.join_page_1');

Route::get('/join-page-2', function () {
    $id = 3;
    return view('game.user2.join_page_2', compact('id'));
})->name('game.join_page_2');

Route::get('/question', function () {
    return view('game.question_page');
})->name('game.question_page');

Route::get('/last-question', function () {
    return view('game.last_question_page');
})->name('game.last_question_page');

Route::get('/waiting-to-finish', function () {
    return view('game.waiting_to_finish_page');
})->name('game.waiting_to_finish');

Route::get('/finish_page', function () {
    return view('game.finish_page');
})->name('game.finish_page');

Route::get('/half-reveal', function () {
    return view('game.half_reveal_page');
})->name('game.half_reveal');

Route::get('/wait-to-reveal', function () {
    return view('game.wait_to_reveal_page');
})->name('game.wait_to_reveal');

Route::get('/full-reveal', function () {
    return view('game.full_reveal_page');
})->name('game.full_reveal');