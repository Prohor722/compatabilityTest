@extends('game.user1.user1_layout')

@section('user1-contents')
    <div class="panel">
        <div>
            <h2>Invite <em>qe</em></h2>
            <p class="sub">Send this code. They enter it on the home page, or open the link.</p>
        </div>
        <div class="code" id="codeEl" aria-label="Invite code V J H R H M">
            <span>V</span><span>J</span><span>H</span><span
                class="gap"></span><span>R</span><span>H</span><span>M</span></div>
        <div class="btns"><button class="btn primary" data-act="copycode">Copy code</button><button class="btn ghost"
                data-act="copymsg">Copy invite message</button></div>
        <p class="count" id="linkEl" style="overflow-wrap:anywhere">
            https://7fb67ff9-62d9-42a5-a774-f6ee6ce817fd.frame.claudeusercontent.com/_f/1795249574-2c4a/#join-VJHRHM</p>
        <div id="invstat">
            <div class="pulse">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z">
                    </path>
                </svg>
                <span>Waiting for qe to join…</span>
            </div>
        </div>
    </div>
@endsection
