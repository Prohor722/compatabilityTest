@extends('game.questions.question_page_layout')
@section('question-contents')
    <div class="panel">
        <div class="prog"><span id="pn">Question 1 of 15</span><span>{{ $partner1 }}</span></div>
        <div class="bar"><i id="pb" style="width: 0%;"></i></div>
        <div class="qtext" id="qt" aria-live="polite" style="">{{ $questions[0] }}</div>
        <div class="answers">
            
            @if ($maybe)
                <button class="ans maybe" data-act="ans" data-v="maybe">Maybe</button>
            @endif
            <button class="ans no" data-act="ans" data-v="no">No</button>
            </div>
        <div class="btns" style="justify-content:space-between"><button class="btn link" data-act="back"
                id="backBtn" style="visibility: hidden;">Previous question</button><span class="count">{{ $partner }} cannot see
                your answers yet.</span></div>
    </div>
@endsection
