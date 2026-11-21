<x-layouts>
    <div class="panel">
        <div class="score">
            <p class="eyebrow">Your compatibility</p><svg class="rings" viewBox="0 0 340 190" role="img"
                aria-label="Two overlapping circles, one for each partner">
                <defs>
                    <clipPath id="cps">
                        <circle id="ccs" r="72" cy="95" cx="159.6"></circle>
                    </clipPath>
                </defs>
                <circle id="cas" class="ringA" r="72" cy="95" cx="159.6"></circle>
                <circle id="cbs" class="ringB" r="72" cy="95" cx="180.4"></circle>
                <circle id="cls" class="lens" r="72" cy="95" cx="180.4" clip-path="url(#cps)">
                </circle>
            </svg>
            <div class="names"><span class="a">User_1</span><span class="b">User_2</span></div>
            <div class="pct" id="pct">87%</div>
            <h2>Wonderfully matched</h2>
        </div>
        <div class="stats">
            <div><b>11</b><small>Same answer</small></div>
            <div><b>4</b><small>Maybe, so close</small></div>
            <div><b>0</b><small>Different</small></div>
        </div>
        <div id="rdy"></div>
        <div class="btns" style="justify-content:center"><button class="btn primary" data-act="reveal">Reveal our
                answers <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z">
                    </path>
                </svg></button></div>
        <p class="count" style="text-align:center">Everything is shown to both of you once you have both pressed
            Reveal.</p>
    </div>
</x-layouts>
