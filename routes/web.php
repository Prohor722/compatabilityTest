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
    $questions = [
        'Do you like to travel?',
        'Would you put me in your top most priority list?',
        'Do you prefer money over love?',
    ];
    $partner2 = 'Partner-2';

    return view('game.user1.step_2', compact('id', 'questions', 'partner2'));
})->name('game.step_2');

Route::get('/step-3', function () {
    $id = 3;
    $partner2 = 'Partner-2';

    return view('game.user1.step_3', compact('id', 'partner2'));
})->name('game.step_3');

Route::get('/step-4', function () {
    $id = 4;
    $partner2 = 'Partner-2';
    $code = '2JHRHM';
    $url = "11https://7fb67ff9-62d9-42a5-a774-f6ee6ce817fd.frame.claudeusercontent.com/_f/1795249574-2c4a/#join-VJHRHM";
    $message = "Join me on CoupleCompatibility, cc. Open https://7fb67ff9-62d9-42a5-a774-f6ee6ce817fd.frame.claudeusercontent.com/_f/1795249574-2c4a/#join-4TQHKV and enter the code 4TQHKV.";

    return view('game.user1.step_4', compact('id', 'partner2', 'code', 'url', 'message'));
})->name('game.step_4');

// Route::get('/join-page', function () {
//     $id = 1;
//     return view('game.join_page_home', compact('id'));
// })->name('game.join_page');

Route::get('/join-page-1', function () {
    $id = 1;
    $partner1  = 'Partner-1';
    $partner2 = 'Partner-2';
    return view('game.user2.join_page_1', compact('id','partner1', 'partner2'));
})->name('game.join_page_1');

Route::get('/join-page-2', function () {
    $id = 2;
    $partner1 = 'Partner-1';
    $partner2 = 'Partner-2';
    return view('game.user2.join_page_2', compact('id', 'partner1', 'partner2'));
})->name('game.join_page_2');

Route::get('/question', function () {
    $partner1 = 'Partner-1';    
    $partner2 = 'Partner-2';
    $questions = [
        'Do you like to travel?',
        'Would you put me in your top most priority list?',
        'Do you prefer money over love?',
    ];
    $maybe = false;
    return view('game.questions.question_page', compact('partner1', 'partner2', 'questions', 'maybe'));
})->name('game.question_page');

Route::get('/last-question', function () {
    $user = 'Partner-1';
    $partner = 'Partner-2';
    $questions = [
        'Do you like to travel?',
        'Would you put me in your top most priority list?',
        'Do you prefer money over love?',
    ];
    $maybe = false;
    return view('game.questions.last_question_page', compact('user', 'partner', 'questions', 'maybe'));
})->name('game.last_question_page');

Route::get('/waiting-to-finish', function () {
    return view('game.waiting_to_finish_page');
})->name('game.waiting_to_finish');

Route::get('/finish_page', function () {
    return view('game.finish_page');
})->name('game.finish_page');

Route::get('/half-reveal', function () {
    $user = 'Partner-1';
    $partner = 'Partner-2';
    $quesAns = [
        'Do you like to travel?'=> 'Yes',
        'Would you put me in your top most priority list?'=> 'Maybe',
        'Do you prefer money over love?'=> 'No',
    ];
    $matchPercentage = 87;
    $status = 'Wonderfully matched';
    return view('game.questions.half_reveal_page', 
    compact('user', 'partner', 'quesAns', 'matchPercentage', 'status'));
})->name('game.half_reveal');

Route::get('/wait-to-reveal', function () {
    return view('game.wait_to_reveal_page');
})->name('game.wait_to_reveal');

Route::get('/full-reveal', function () {
    return view('game.questions.full_reveal_page');
})->name('game.full_reveal');