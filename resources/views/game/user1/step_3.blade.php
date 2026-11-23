@extends('game.user1.user1_layout')

@section('user1-contents')

    <div class="panel">
        <div>
            <h2>How many questions?</h2>
            <p class="sub">You and qe will answer the same set. The minimum is your own questions plus 10 from us.</p>
        </div>
        <div>
            <div class="bigcount" id="tot">15</div>
            <p class="count" id="split">2 yours + 13 from us</p>
        </div>
        <div><label for="rng" class="sr">Number of questions</label><input type="range" id="rng"
                min="12" max="32" value="15">
            <div style="display:flex;justify-content:space-between" class="count"><span>12</span><span>32</span></div>
        </div>
        <p class="count">Questions that qe adds will be included too, so the total can grow a little.</p>
        <p class="err" id="err" role="alert"></p>

        <div class="btns">
            <a href="{{ route('game.step_2') }}">
                <button class="btn ghost" data-act="toQuestions">Back</button>
            </a>

            <a href="{{ route('game.step_4') }}">
                <button class="btn ghost game-start-btn-2" data-act="create" id="createBtn">Start the game <svg viewBox="0 0 24 24"
                        aria-hidden="true" id="heart">
                        <path
                            d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z">
                        </path>
                    </svg>
                </button>
            </a>
        </div>
    </div>

@endsection
