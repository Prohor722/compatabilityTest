<x-layouts>

    <div id="main">
        <ol class="steps" aria-label="Progress">
            <li class="on" aria-current="step">Names</li>
            <li class="">Questions</li>
            <li class="">Count</li>
            <li class="">Invite</li>
        </ol>
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
                    <div class="btns"><button class="btn ghost" type="button" data-act="home">Back</button><button
                            class="btn primary" type="submit">Continue</button></div>
                </div>
            </form>
        </div>
    </div>

</x-layouts>
