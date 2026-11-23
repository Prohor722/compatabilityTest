@extends('game.user2.user2_layout')

@section('user2-contents')
    <div class="panel">
        <div>
            <h2>Hello! <em>qq</em> invited you</h2>
            <p class="sub">Is this how you want your name to appear?</p>
        </div>
        <form id="fJoin" novalidate="">
            <div style="display:flex;flex-direction:column;gap:16px">
                <div class="field"><label for="jn">Your name</label><input type="text" id="jn"
                        maxlength="24" autocomplete="off" value="qe"></div>
                <p class="err" id="err" role="alert">Please enter your name.</p>
                <div class="btns">
                    <a href="{{ route('home') }}">
                        <button class="btn ghost" type="button" data-act="joinback">Back</button>
                    </a>

                    <a href="{{ route('game.join_page_2') }}">
                        <button class="btn primary" type="button">Join qq</button>
                    </a>
                </div>
            </div>
        </form>
    </div>
@endsection
