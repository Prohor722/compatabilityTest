@extends('game.user1.user1_layout')

@section('user1-contents')
    
        <div class="panel">
            <div>
                <h2>Who is playing?</h2>
                <p class="sub">Two partners, no more. Your partner can adjust their name when they join.</p>
            </div>
            <form id="fNames" novalidate="">
                <div style="display:flex;flex-direction:column;gap:16px">
                    <div class="field"><label for="n1">Your name</label><input type="text" id="n1"
                            maxlength="24" autocomplete="off" value=""></div>
                    <div class="field"><label for="n2">Your partner's name</label><input type="text"
                            id="n2" maxlength="24" autocomplete="off" value=""></div>
                    <p class="err" id="err" role="alert"></p>
                    <div class="btns">
                        <a href="{{ route('game.step_2') }}">
                            <button class="btn ghost" type="button" data-act="home">Back</button><button
                                class="btn primary" type="submit">Continue</button>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>

@endsection
