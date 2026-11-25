@extends('game.questions.question_page_layout')
@section('question-contents')
    <div class="panel">
        <div class="prog"><span id="pn">Question 15 of 15</span><span>{{ $user }}</span></div>
        <div class="bar"><i id="pb" style="width: 93.3333%;"></i></div>
        <div class="qtext" id="qt" aria-live="polite" style="">{{ $questions[2] }}</div>
        <div class="answers">
            <button class="ans yes" data-act="ans" data-v="yes">
                <svg viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                        d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z">
                    </path>
                </svg>
                Yes
            </button>
            @if ($maybe)
                <button class="ans maybe" data-act="ans" data-v="maybe">Maybe</button>
            @endif
            <button class="ans no" data-act="ans" data-v="no">No</button>
        </div>
        <div class="btns" style="justify-content:space-between">
            <button class="btn link" data-act="back" id="backBtn" style="visibility: visible;">Previous question</button>
            <span class="count">{{ $partner }} cannot see your answers yet.</span>
        </div>
    </div>
@endsection
