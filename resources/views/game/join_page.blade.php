<x-layouts>
    <div class="panel">
        <div>
            <h2>Join your partner</h2>
            <p class="sub">Enter the code they sent you.</p>
        </div>
        <form id="fCode" novalidate="">
            <div style="display:flex;flex-direction:column;gap:16px">
                <div class="field"><label for="jc">Invite code</label><input type="text" id="jc"
                        maxlength="9" autocomplete="off" autocapitalize="characters" spellcheck="false" value="VJHRHM"
                        style="letter-spacing:.25em;font-size:1.3rem;text-transform:uppercase"></div>
                <p class="err" id="err" role="alert">Codes have 6 letters and numbers.</p>
                <div class="btns"><button class="btn ghost" type="button" data-act="home">Back</button><button
                        class="btn primary" type="submit">Find our room</button></div>
            </div>
        </form>
    </div>
</x-layouts>
