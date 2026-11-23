@extends('game.user1.user1_layout')

@section('user1-contents')
    <div class="panel">
        <div>
            <h2>Add your own questions</h2>
            <p class="sub">Ask what you really want to know. qe can add some too when they join.</p>
        </div>
        <div class="note"><svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 8v5M12 16.5v.5" stroke-linecap="round"></path>
            </svg>
            <div><b>Every question must have a Yes or No answer.</b><br>Good: "Do you like staying in on Fridays?" Not
                good: "What is your dream holiday?"</div>
        </div>
        <form id="fQ" novalidate="">
            <div class="addrow">
                <div class="field"><label for="qin">Your question</label><input type="text" id="qin"
                        maxlength="140" autocomplete="off" placeholder="Do you want a dog someday?"></div><button
                    class="btn primary" type="submit" style="margin-top:26px">Add</button>
            </div>
            <p class="warn" id="warn" aria-live="polite"></p>
            <p class="err" id="err" role="alert"></p>
        </form>
        <div>
            <p class="count" id="qcount">2 of 10 added</p>
            <div id="qlist" style="margin-top:8px">
                <ul class="qs">
                    <li><span>aaaaaa jdcdkas ncjksdncds?</span><button class="rm" data-act="rmq" data-i="0"
                            aria-label="Remove question: aaaaaa jdcdkas ncjksdncds?">×</button></li>
                    <li><span>ababa djn njkkdcnsd?</span><button class="rm" data-act="rmq" data-i="1"
                            aria-label="Remove question: ababa djn njkkdcnsd?">×</button></li>
                </ul>
            </div>
        </div><label class="switch" for="maybe"><input type="checkbox" id="maybe" checked=""><span><b>Add a
                    Maybe option to every question</b><small>You will both see Yes, Maybe and No.</small></span></label>
        <div class="btns"><button class="btn ghost" data-act="toNames">Back</button><button class="btn primary"
                data-act="toCount">Continue</button></div>
    </div>
@endsection
