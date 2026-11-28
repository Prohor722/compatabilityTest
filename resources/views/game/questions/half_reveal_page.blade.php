@extends('game.questions.question_page_layout')
@section('question-contents')
        <div class="panel">
            <div class="score">
                <p class="eyebrow">{{ $user }} &amp; {{ $partner }}</p>
                <div class="pct">{{ $matchPercentage }}%</div>
                <h2>{{ $status }}</h2>
            </div>
            <div class="banner">Only your answers are showing. {{ $partner }}'s answers appear as soon as they press Reveal.</div>
        </div>

        <div class="rlist">
            @foreach ($quesAns as $question => $answer)
                <article class="rq">
                    <div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><small>From
                            us</small></div>
                    <h3>{{ $question }}</h3>
                    <div class="pair">
                        <div class="who">
                            <small>{{ $partner }}</small>
                            <span class="chip hid">
                                <svg viewBox="0 0 24 24">
                                    <rect x="5" y="11" width="14" height="9" rx="2"></rect>
                                    <path d="M8 11V8a4 4 0 018 0v3"></path>
                                </svg>
                                Hidden
                            </span>
                        </div>
                    </div>
                </article>
            @endforeach

        </div>

        <div class="panel">
            <div>
                <h3 style="font-size:1.4rem">Want another round?</h3>
                <p class="sub">Restart keeps your room and your own questions, and picks a fresh set of questions
                    for both of you.</p>
            </div>
            <div class="btns">
                <button class="btn primary" data-act="restart">Restart</button>
                <button class="btn ghost" data-act="home">Leave room</button>
            </div>
        </div>
@endsection
