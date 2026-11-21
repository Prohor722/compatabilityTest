<x-layouts>
    <main id="main">
        <ol class="steps" aria-label="Progress">
            <li class="done">Join</li>
            <li class="on" aria-current="step">Questions</li>
            <li class="">Begin</li>
        </ol>
        <div class="panel">
            <div>
                <h2>qe, add your questions</h2>
                <p class="sub">qq is waiting for you. Every question will include a Maybe option.</p>
            </div>
            <div class="note"><svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 8v5M12 16.5v.5" stroke-linecap="round"></path>
                </svg>
                <div><b>Every question must have a Yes or No answer.</b><br>Good: "Do you like staying in on Fridays?"
                    Not good: "What is your dream holiday?"</div>
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
                <p class="count" id="qcount">0 of 10 added</p>
                <div id="qlist" style="margin-top:8px">
                    <p class="empty">No questions of your own yet. We will add romantic ones for you, at least 10.</p>
                </div>
            </div>
            <p class="count" id="p2total">Quiz length: 15 questions (2 from qq, 0 from you, the rest from us).</p>
            <div class="btns"><button class="btn primary" data-act="begin">Start the quiz <svg viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path
                            d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z">
                        </path>
                    </svg></button></div>
        </div>
    </main>
</x-layouts>
