<x-layouts>
    <div class="panel">
        <ol class="steps" aria-label="Progress">
            <li class="on" aria-current="step">Join</li>
            <li class="">Questions</li>
            <li class="">Begin</li>
        </ol>
        <div>
            <h2>Hello! <em>qq</em> invited you</h2>
            <p class="sub">Is this how you want your name to appear?</p>
        </div>
        <form id="fJoin" novalidate="">
            <div style="display:flex;flex-direction:column;gap:16px">
                <div class="field"><label for="jn">Your name</label><input type="text" id="jn"
                        maxlength="24" autocomplete="off" value="qe"></div>
                <p class="err" id="err" role="alert">Please enter your name.</p>
                <div class="btns"><button class="btn ghost" type="button" data-act="joinback">Back</button><button
                        class="btn primary" type="submit">Join qq</button></div>
            </div>
        </form>
    </div>
</x-layouts>
