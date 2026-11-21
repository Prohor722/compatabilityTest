(function () {
    "use strict";
    var SYS = [
        "Do we agree on how many children we want, if any?",
        "Would you move to another country for my career?",
        "Do you like a quiet night in more than a night out?",
        "Is it okay for each of us to keep some money separate?",
        'Should we say "I love you" every single day?',
        "Do you want to get married one day?",
        "Should we settle an argument before we go to sleep?",
        "Are you comfortable with me having close friendships you are not part of?",
        "Would you adopt a pet together with me?",
        "Do you prefer surprise gifts to gifts you picked yourself?",
        "Should we know each other's phone passwords?",
        "Do you think time apart keeps a relationship healthy?",
        "Would you rather live in a city than in the countryside?",
        "Do you enjoy planning a trip down to the last detail?",
        "Would you want us to live together before marriage?",
        "Is it important to meet each other's families early on?",
        "Should we split the chores equally?",
        "Would you forgive a lie told to protect your feelings?",
        "Are you a morning person?",
        "Do you like to celebrate birthdays and anniversaries in a big way?",
        "Is cooking together one of your favourite things to do?",
        "Would you retire early even if it meant living on less?",
        "Is it important that we share the same beliefs about religion?",
        "Do you tell me everything, even the small worries?",
        "Do you love cuddling through a movie?",
        "Do you want us to buy a home together someday?",
        "Do you think we would cope well if one of us lost a job?",
        "Do you like trying new things even when you feel nervous?",
        "Are you usually the first one to say sorry after a fight?",
        "Would you want a big wedding?",
        "Do you enjoy meeting new people together?",
        "Is it fine for us to spend a whole weekend on separate hobbies?",
        "Would you like to learn something new together, like dancing or a language?",
        "Do you think love matters more than money?",
        "Do you like handwritten notes and letters?",
        "Do you remember our first date clearly?",
        "Do you prefer to keep our relationship private on social media?",
        "Would you stay with me if we lived far apart for a year?",
        "Do you like to dance in the kitchen when no one is watching?",
        "Would you want us to have a tradition that only we two share?",
    ];
    var $ = function (s) {
        return document.querySelector(s);
    };
    var esc = function (s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            }[c];
        });
    };
    var mem = {};
    function sget(k) {
        try {
            var v = sessionStorage.getItem(k);
            if (v !== null) return v;
        } catch (e) {}
        return mem[k] == null ? null : mem[k];
    }
    function sset(k, v) {
        mem[k] = v;
        try {
            sessionStorage.setItem(k, v);
        } catch (e) {}
    }
    function sdel(k) {
        delete mem[k];
        try {
            sessionStorage.removeItem(k);
        } catch (e) {}
    }

    var db = null,
        user = null,
        ready = false,
        canWrite = null;
    var S = {
        view: "welcome",
        screen: null,
        code: null,
        seat: null,
        game: null,
        mine: { a: {}, done: false, revealed: false },
        other: null,
        loaded: { g: false, me: false, ot: false },
        round: 0,
        qi: 0,
        subs: [],
        ansSubs: [],
        wq: Promise.resolve(),
        draft: { n1: "", n2: "", qs: [], maybe: true, total: 15 },
        join: { stage: "code", code: "", game: null, err: "" },
        confirm: false,
        fatal: false,
    };
    var main = $("#main");

    /* ---------- helpers ---------- */
    function toast(t) {
        var e = $("#toast");
        e.textContent = t;
        e.classList.add("on");
        clearTimeout(toast.t);
        toast.t = setTimeout(function () {
            e.classList.remove("on");
        }, 2600);
    }
    function shuffle(a) {
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i];
            a[i] = a[j];
            a[j] = t;
        }
        return a;
    }
    function genCode() {
        var c = "ABCDEFGHJKMNPQRSTUVWXYZ23456789",
            s = "",
            r = new Uint8Array(6);
        crypto.getRandomValues(r);
        for (var i = 0; i < 6; i++) s += c[r[i] % c.length];
        return s;
    }
    function normCode(v) {
        return String(v || "")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 8);
    }
    function clone(o) {
        return JSON.parse(JSON.stringify(o));
    }
    var HEART =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z"/></svg>';
    function stepper(labels, on) {
        return (
            '<ol class="steps" aria-label="Progress">' +
            labels
                .map(function (l, i) {
                    return (
                        '<li class="' +
                        (i < on ? "done" : i === on ? "on" : "") +
                        '"' +
                        (i === on ? ' aria-current="step"' : "") +
                        ">" +
                        l +
                        "</li>"
                    );
                })
                .join("") +
            "</ol>"
        );
    }
    var P1 = ["Names", "Questions", "Count", "Invite"],
        P2 = ["Join", "Questions", "Begin"];
    function names() {
        var g = S.game;
        return g ? { p1: g.n1, p2: g.n2 } : { p1: S.draft.n1, p2: S.draft.n2 };
    }
    function myName() {
        var n = names();
        return S.seat === "p2" ? n.p2 : n.p1;
    }
    function otherName() {
        var n = names();
        return S.seat === "p2" ? n.p1 : n.p2;
    }
    function qCount() {
        return S.game && S.game.qs ? S.game.qs.length : 0;
    }
    function ringsSVG(id) {
        return (
            '<svg class="rings" viewBox="0 0 340 190" role="img" aria-label="Two overlapping circles, one for each partner"><defs><clipPath id="cp' +
            id +
            '"><circle id="cc' +
            id +
            '" r="72" cy="95" cx="90"/></clipPath></defs><circle id="ca' +
            id +
            '" class="ringA" r="72" cy="95" cx="90"/><circle id="cb' +
            id +
            '" class="ringB" r="72" cy="95" cx="250"/><circle id="cl' +
            id +
            '" class="lens" r="72" cy="95" cx="250" clip-path="url(#cp' +
            id +
            ')"/></svg>'
        );
    }
    function setD(id, d) {
        var a = 170 - d / 2,
            b = 170 + d / 2;
        var m = { ca: a, cc: a, cb: b, cl: b };
        for (var k in m) {
            var e = document.getElementById(k + id);
            if (e) e.setAttribute("cx", m[k]);
        }
    }
    function tween(id, from, to) {
        if (
            window.matchMedia &&
            matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setD(id, to);
            return;
        }
        var t0 = null,
            dur = 1500;
        setD(id, from);
        function f(t) {
            if (t0 === null) t0 = t;
            var p = Math.min(1, (t - t0) / dur);
            p = 1 - Math.pow(1 - p, 3);
            setD(id, from + (to - from) * p);
            if (p < 1) requestAnimationFrame(f);
        }
        requestAnimationFrame(f);
    }
    function copyText(text, anchorSel) {
        var done = function () {
            toast("Copied");
        };
        var fallback = function () {
            var n = $(anchorSel);
            if (n) {
                var r = document.createRange();
                r.selectNodeContents(n);
                var s = getSelection();
                s.removeAllRanges();
                s.addRange(r);
            }
            toast("Select the text and copy it");
        };
        try {
            navigator.clipboard.writeText(text).then(done, fallback);
        } catch (e) {
            fallback();
        }
    }

    /* ---------- derived state ---------- */
    function key() {
        if (!S.code) return S.view;
        var g = S.game;
        if (S.fatal) return "fatal";
        if (!g) return "loading";
        if (g.status === "lobby" || (g.status === "p2setup" && S.seat === "p1"))
            return "invite";
        if (g.status === "p2setup") return "p2q";
        if (!(S.loaded.g && S.loaded.me && S.loaded.ot)) return "loading";
        if (!S.mine.done) return "play";
        if (!(S.other && S.other.done)) return "wait";
        if (!S.mine.revealed) return "score";
        return "reveal";
    }
    function results() {
        var n = qCount(),
            sum = 0,
            same = 0,
            part = 0;
        for (var i = 0; i < n; i++) {
            var a = S.mine.a[i],
                b = S.other && S.other.a ? S.other.a[i] : undefined;
            if (a === b) {
                sum += 1;
                same++;
            } else if (a === "maybe" || b === "maybe") {
                sum += 0.5;
                part++;
            }
        }
        return {
            pct: n ? Math.round((sum / n) * 100) : 0,
            same: same,
            part: part,
            diff: n - same - part,
            n: n,
        };
    }
    function tier(p) {
        return p >= 90
            ? "In perfect sync"
            : p >= 75
              ? "Wonderfully matched"
              : p >= 55
                ? "Beautifully different"
                : p >= 35
                  ? "Opposites, still learning"
                  : "So much to talk about";
    }

    /* ---------- screens ---------- */
    function vWelcome() {
        var hearts = [
            [8, 18, 0],
            [86, 10, 2],
            [72, 48, 4],
            [14, 60, 1],
            [92, 70, 3],
        ]
            .map(function (h) {
                return (
                    '<svg viewBox="0 0 24 24" style="left:' +
                    h[0] +
                    "%;top:" +
                    h[1] +
                    "%;animation-delay:-" +
                    h[2] +
                    's"><path d="M12 21s-7.5-4.6-9.6-9.3C1 8.4 3 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5 21 5 23 8.4 21.6 11.7 19.5 16.4 12 21 12 21z"/></svg>'
                );
            })
            .join("");
        return (
            '<section class="hero"><div class="hearts" aria-hidden="true">' +
            hearts +
            "</div>" +
            ringsSVG("w") +
            '<p class="eyebrow">For two people in love</p>' +
            "<h1>How well do you two <em>really</em> match?</h1>" +
            '<p class="lede">Answer the same questions on your own. See your score together. Then reveal what each of you secretly said.</p>' +
            '<div class="btns"><button class="btn primary" data-act="start">Test compatibility ' +
            HEART +
            '</button><button class="btn ghost" data-act="joinview">I have an invite code</button></div>' +
            '<ol class="how"><li><b>Answer apart</b>Yes, No or Maybe, in private.</li><li><b>Meet in the middle</b>One score, shown to both of you.</li><li><b>Reveal together</b>See who said what, question by question.</li></ol></section>'
        );
    }
    function vNames() {
        return (
            stepper(P1, 0) +
            '<div class="panel"><div><h2>Who is playing?</h2><p class="sub">Two partners, no more. Your partner can adjust their name when they join.</p></div>' +
            '<form id="fNames" novalidate><div style="display:flex;flex-direction:column;gap:16px">' +
            '<div class="field"><label for="n1">Your name</label><input type="text" id="n1" maxlength="24" autocomplete="off" value="' +
            esc(S.draft.n1) +
            '"></div>' +
            '<div class="field"><label for="n2">Your partner\'s name</label><input type="text" id="n2" maxlength="24" autocomplete="off" value="' +
            esc(S.draft.n2) +
            '"></div>' +
            '<p class="err" id="err" role="alert"></p>' +
            '<div class="btns"><button class="btn ghost" type="button" data-act="home">Back</button><button class="btn primary" type="submit">Continue</button></div></div></form></div>'
        );
    }
    function noteBox() {
        return '<div class="note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5" stroke-linecap="round"/></svg><div><b>Every question must have a Yes or No answer.</b><br>Good: "Do you like staying in on Fridays?" Not good: "What is your dream holiday?"</div></div>';
    }
    function qEditor(who, maxLeft) {
        return (
            noteBox() +
            '<form id="fQ" novalidate><div class="addrow"><div class="field"><label for="qin">Your question</label><input type="text" id="qin" maxlength="140" autocomplete="off" placeholder="Do you want a dog someday?"></div><button class="btn primary" type="submit" style="margin-top:26px">Add</button></div><p class="warn" id="warn" aria-live="polite"></p><p class="err" id="err" role="alert"></p></form>' +
            '<div><p class="count" id="qcount"></p><div id="qlist" style="margin-top:8px"></div></div>'
        );
    }
    function listHTML() {
        var l = curList();
        if (!l.length)
            return '<p class="empty">No questions of your own yet. We will add romantic ones for you, at least 10.</p>';
        return (
            '<ul class="qs">' +
            l
                .map(function (q, i) {
                    return (
                        "<li><span>" +
                        esc(q) +
                        '</span><button class="rm" data-act="rmq" data-i="' +
                        i +
                        '" aria-label="Remove question: ' +
                        esc(q) +
                        '">&times;</button></li>'
                    );
                })
                .join("") +
            "</ul>"
        );
    }
    function paintList() {
        var e = $("#qlist");
        if (e) e.innerHTML = listHTML();
        var c = $("#qcount");
        if (c) c.textContent = curList().length + " of 10 added";
    }
    function curList() {
        return S.code ? (S.game && S.game.p2Qs) || [] : S.draft.qs;
    }
    function vQuestions() {
        var n = names();
        return (
            stepper(P1, 1) +
            '<div class="panel"><div><h2>Add your own questions</h2><p class="sub">Ask what you really want to know. ' +
            esc(n.p2) +
            " can add some too when they join.</p></div>" +
            qEditor() +
            '<label class="switch" for="maybe"><input type="checkbox" id="maybe" ' +
            (S.draft.maybe ? "checked" : "") +
            "><span><b>Add a Maybe option to every question</b><small>You will both see Yes, Maybe and No.</small></span></label>" +
            '<div class="btns"><button class="btn ghost" data-act="toNames">Back</button><button class="btn primary" data-act="toCount">Continue</button></div></div>'
        );
    }
    function countBounds() {
        var c = S.draft.qs.length;
        return { min: c + 10, max: c + 30 };
    }
    function vCount() {
        var b = countBounds();
        S.draft.total = Math.max(b.min, Math.min(b.max, S.draft.total));
        var n = names();
        return (
            stepper(P1, 2) +
            '<div class="panel"><div><h2>How many questions?</h2><p class="sub">You and ' +
            esc(n.p2) +
            " will answer the same set. The minimum is your own questions plus 10 from us.</p></div>" +
            '<div><div class="bigcount" id="tot">' +
            S.draft.total +
            '</div><p class="count" id="split"></p></div>' +
            '<div><label for="rng" class="sr">Number of questions</label><input type="range" id="rng" min="' +
            b.min +
            '" max="' +
            b.max +
            '" value="' +
            S.draft.total +
            '"><div style="display:flex;justify-content:space-between" class="count"><span>' +
            b.min +
            "</span><span>" +
            b.max +
            "</span></div></div>" +
            '<p class="count">Questions that ' +
            esc(n.p2) +
            " adds will be included too, so the total can grow a little.</p>" +
            '<p class="err" id="err" role="alert"></p>' +
            '<div class="btns"><button class="btn ghost" data-act="toQuestions">Back</button><button class="btn primary" data-act="create" id="createBtn">Start the game ' +
            HEART +
            "</button></div></div>"
        );
    }
    function paintCount() {
        var t = $("#tot");
        if (!t) return;
        t.textContent = S.draft.total;
        var c = S.draft.qs.length;
        $("#split").textContent =
            c + " yours + " + (S.draft.total - c) + " from us";
    }
    function codeHTML(c) {
        return (
            '<div class="code" id="codeEl" aria-label="Invite code ' +
            c.split("").join(" ") +
            '">' +
            c
                .slice(0, 3)
                .split("")
                .map(function (x) {
                    return "<span>" + x + "</span>";
                })
                .join("") +
            '<span class="gap"></span>' +
            c
                .slice(3)
                .split("")
                .map(function (x) {
                    return "<span>" + x + "</span>";
                })
                .join("") +
            "</div>"
        );
    }
    function inviteLink() {
        return /^https?:/.test(location.href)
            ? location.href.split("#")[0] + "#join-" + S.code
            : "";
    }
    function inviteMsg() {
        var l = inviteLink();
        return (
            "Join me on CoupleCompatibility, " +
            names().p2 +
            ". " +
            (l ? "Open " + l + " and " : "Open the page and ") +
            "enter the code " +
            S.code +
            "."
        );
    }
    function vInvite() {
        var n = names();
        return (
            stepper(P1, 3) +
            '<div class="panel"><div><h2>Invite <em>' +
            esc(n.p2) +
            '</em></h2><p class="sub">Send this code. They enter it on the home page, or open the link.</p></div>' +
            codeHTML(S.code) +
            '<div class="btns"><button class="btn primary" data-act="copycode">Copy code</button><button class="btn ghost" data-act="copymsg">Copy invite message</button></div>' +
            (inviteLink()
                ? '<p class="count" id="linkEl" style="overflow-wrap:anywhere">' +
                  esc(inviteLink()) +
                  "</p>"
                : "") +
            '<div id="invstat"></div></div>'
        );
    }
    function paintInvite() {
        var e = $("#invstat");
        if (!e) return;
        var n = names(),
            g = S.game;
        e.innerHTML =
            g && g.status === "p2setup"
                ? '<div class="ready">' +
                  esc(n.p2) +
                  ' has joined and is adding questions.</div><p class="count" style="margin-top:8px">The quiz starts as soon as ' +
                  esc(n.p2) +
                  " presses start.</p>"
                : '<div class="pulse">' +
                  HEART +
                  "<span>Waiting for " +
                  esc(n.p2) +
                  " to join&hellip;</span></div>";
    }
    function vJoin() {
        var j = S.join,
            body = "";
        if (j.stage === "code") {
            body =
                '<div><h2>Join your partner</h2><p class="sub">Enter the code they sent you.</p></div><form id="fCode" novalidate><div style="display:flex;flex-direction:column;gap:16px"><div class="field"><label for="jc">Invite code</label><input type="text" id="jc" maxlength="9" autocomplete="off" autocapitalize="characters" spellcheck="false" value="' +
                esc(j.code) +
                '" style="letter-spacing:.25em;font-size:1.3rem;text-transform:uppercase"></div><p class="err" id="err" role="alert">' +
                esc(j.err) +
                '</p><div class="btns"><button class="btn ghost" type="button" data-act="home">Back</button><button class="btn primary" type="submit">Find our room</button></div></div></form>';
        } else if (j.stage === "name") {
            body =
                stepper(P2, 0) +
                "<div><h2>Hello! <em>" +
                esc(j.game.n1) +
                '</em> invited you</h2><p class="sub">Is this how you want your name to appear?</p></div><form id="fJoin" novalidate><div style="display:flex;flex-direction:column;gap:16px"><div class="field"><label for="jn">Your name</label><input type="text" id="jn" maxlength="24" autocomplete="off" value="' +
                esc(j.game.n2) +
                '"></div><p class="err" id="err" role="alert">' +
                esc(j.err) +
                '</p><div class="btns"><button class="btn ghost" type="button" data-act="joinback">Back</button><button class="btn primary" type="submit">Join ' +
                esc(j.game.n1) +
                "</button></div></div></form>";
        } else {
            body =
                '<div><h2>This room has both partners</h2><p class="sub">Welcome back. Who are you?</p></div><div class="btns"><button class="btn primary" data-act="claim" data-seat="p1">I am ' +
                esc(j.game.n1) +
                '</button><button class="btn primary" data-act="claim" data-seat="p2">I am ' +
                esc(j.game.n2) +
                '</button></div><div class="btns"><button class="btn ghost" data-act="joinback">Back</button></div>';
        }
        return '<div class="panel">' + body + "</div>";
    }
    function vP2Q() {
        var n = names(),
            g = S.game;
        return (
            stepper(P2, 1) +
            '<div class="panel"><div><h2>' +
            esc(n.p2) +
            ', add your questions</h2><p class="sub">' +
            esc(n.p1) +
            " is waiting for you. " +
            (g.maybe
                ? "Every question will include a Maybe option."
                : "Every question is Yes or No.") +
            "</p></div>" +
            qEditor() +
            '<p class="count" id="p2total"></p>' +
            '<div class="btns"><button class="btn primary" data-act="begin">Start the quiz ' +
            HEART +
            "</button></div></div>"
        );
    }
    function paintP2() {
        paintList();
        var g = S.game,
            c = (g.p1Qs || []).length + (g.p2Qs || []).length,
            t = Math.min(Math.max(g.total, c + 10), c + SYS.length);
        var e = $("#p2total");
        if (e)
            e.textContent =
                "Quiz length: " +
                t +
                " questions (" +
                (g.p1Qs || []).length +
                " from " +
                g.n1 +
                ", " +
                (g.p2Qs || []).length +
                " from you, the rest from us).";
    }
    function vPlay() {
        var g = S.game,
            n = g.qs.length;
        return (
            '<div class="panel"><div class="prog"><span id="pn"></span><span>' +
            esc(myName()) +
            '</span></div><div class="bar"><i id="pb"></i></div>' +
            '<div class="qtext" id="qt" aria-live="polite"></div>' +
            '<div class="answers"><button class="ans yes" data-act="ans" data-v="yes">' +
            HEART +
            "Yes</button>" +
            (g.maybe
                ? '<button class="ans maybe" data-act="ans" data-v="maybe">Maybe</button>'
                : "") +
            '<button class="ans no" data-act="ans" data-v="no">No</button></div>' +
            '<div class="btns" style="justify-content:space-between"><button class="btn link" data-act="back" id="backBtn">Previous question</button><span class="count">' +
            esc(otherName()) +
            " cannot see your answers yet.</span></div></div>"
        );
    }
    function paintPlay() {
        var g = S.game,
            n = g.qs.length,
            i = S.qi;
        if (i >= n) i = S.qi = n - 1;
        $("#pn").textContent = "Question " + (i + 1) + " of " + n;
        $("#pb").style.width = (i / n) * 100 + "%";
        var qt = $("#qt");
        qt.style.animation = "none";
        void qt.offsetWidth;
        qt.style.animation = "";
        qt.textContent = g.qs[i].t;
        $("#backBtn").style.visibility = i > 0 ? "visible" : "hidden";
        var cur = S.mine.a[i];
        document.querySelectorAll(".ans").forEach(function (b) {
            b.classList.toggle("sel", b.dataset.v === cur);
        });
    }
    function vWait() {
        var o = S.other,
            c = o && o.a ? Object.keys(o.a).length : 0;
        return (
            '<div class="panel" style="text-align:center;align-items:center"><h2>Your answers are in</h2><p class="sub">Waiting for <b>' +
            esc(otherName()) +
            "</b> to finish. Their progress: " +
            c +
            " of " +
            qCount() +
            '.</p><div class="pulse">' +
            HEART +
            "<span>Your score appears when you are both done</span></div></div>"
        );
    }
    function vScore() {
        var r = results(),
            n = names();
        return (
            '<div class="panel"><div class="score"><p class="eyebrow">Your compatibility</p>' +
            ringsSVG("s") +
            '<div class="names"><span class="a">' +
            esc(n.p1) +
            '</span><span class="b">' +
            esc(n.p2) +
            '</span></div><div class="pct" id="pct">0%</div><h2>' +
            tier(r.pct) +
            "</h2></div>" +
            '<div class="stats"><div><b>' +
            r.same +
            "</b><small>Same answer</small></div><div><b>" +
            r.part +
            "</b><small>Maybe, so close</small></div><div><b>" +
            r.diff +
            "</b><small>Different</small></div></div>" +
            '<div id="rdy"></div>' +
            '<div class="btns" style="justify-content:center"><button class="btn primary" data-act="reveal">Reveal our answers ' +
            HEART +
            "</button></div>" +
            '<p class="count" style="text-align:center">Everything is shown to both of you once you have both pressed Reveal.</p></div>'
        );
    }
    function paintScore() {
        var e = $("#rdy");
        if (e)
            e.innerHTML =
                S.other && S.other.revealed
                    ? '<div class="ready">' +
                      esc(otherName()) +
                      " is ready to reveal.</div>"
                    : "";
    }
    function chipHTML(v, show) {
        if (!show)
            return '<span class="chip hid"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>Hidden</span>';
        if (v === "yes") return '<span class="chip yes">Yes</span>';
        if (v === "no") return '<span class="chip no">No</span>';
        if (v === "maybe") return '<span class="chip maybe">Maybe</span>';
        return '<span class="chip hid">No answer</span>';
    }
    function vReveal() {
        var g = S.game,
            n = names(),
            r = results(),
            both = !!(S.other && S.other.revealed),
            me = S.seat;
        var rows = g.qs
            .map(function (q, i) {
                var m = S.mine.a[i],
                    o = S.other.a ? S.other.a[i] : undefined;
                var a1 = me === "p1" ? m : o,
                    a2 = me === "p1" ? o : m,
                    s1 = me === "p1" ? true : both,
                    s2 = me === "p2" ? true : both;
                var tag = "";
                if (both) {
                    tag =
                        a1 === a2
                            ? '<span class="tag same">Same</span>'
                            : a1 === "maybe" || a2 === "maybe"
                              ? '<span class="tag close">Close</span>'
                              : '<span class="tag diff">Different</span>';
                }
                var by =
                    q.by === "sys"
                        ? "From us"
                        : "Asked by " + (q.by === "p1" ? n.p1 : n.p2);
                return (
                    '<article class="rq"><div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><small>' +
                    esc(by) +
                    "</small>" +
                    tag +
                    "</div><h3>" +
                    esc(q.t) +
                    '</h3><div class="pair"><div class="who"><small>' +
                    esc(n.p1) +
                    "</small>" +
                    chipHTML(a1, s1) +
                    '</div><div class="who"><small>' +
                    esc(n.p2) +
                    "</small>" +
                    chipHTML(a2, s2) +
                    "</div></div></article>"
                );
            })
            .join("");
        return (
            '<div class="panel"><div class="score"><p class="eyebrow">' +
            esc(n.p1) +
            " &amp; " +
            esc(n.p2) +
            '</p><div class="pct">' +
            r.pct +
            "%</div><h2>" +
            tier(r.pct) +
            "</h2></div>" +
            '<div class="banner">' +
            (both
                ? "You have both revealed. Here is what each of you said."
                : "Only your answers are showing. " +
                  esc(otherName()) +
                  "'s answers appear as soon as they press Reveal.") +
            "</div></div>" +
            '<div class="rlist">' +
            rows +
            "</div>" +
            '<div class="panel"><div><h3 style="font-size:1.4rem">Want another round?</h3><p class="sub">Restart keeps your room and your own questions, and picks a fresh set of questions for both of you.</p></div>' +
            '<div class="btns"><button class="btn primary" data-act="restart">' +
            (S.confirm ? "Tap again to restart" : "Restart") +
            '</button><button class="btn ghost" data-act="home">Leave room</button></div></div>'
        );
    }
    function vLoading() {
        return (
            '<div class="panel" style="text-align:center;align-items:center"><div class="pulse">' +
            HEART +
            '<span id="ltxt">Opening your room&hellip;</span></div></div>'
        );
    }
    function vFatal() {
        return '<div class="panel"><h2>We lost the connection</h2><p class="sub">Your answers so far are saved. Check your connection and open the room again.</p><div class="btns"><button class="btn primary" data-act="reload">Reopen room</button><button class="btn ghost" data-act="home">Back to start</button></div></div>';
    }

    var VIEWS = {
        welcome: vWelcome,
        names: vNames,
        questions: vQuestions,
        count: vCount,
        join: vJoin,
        invite: vInvite,
        p2q: vP2Q,
        play: vPlay,
        wait: vWait,
        score: vScore,
        reveal: vReveal,
        loading: vLoading,
        fatal: vFatal,
    };
    function renderScreen(k) {
        main.innerHTML = VIEWS[k]();
        afterRender(k);
    }
    function afterRender(k) {
        if (k === "questions") paintList();
        if (k === "count") paintCount();
        if (k === "invite") paintInvite();
        if (k === "p2q") paintP2();
        if (k === "play") paintPlay();
        if (k === "score") {
            var r = results();
            paintScore();
            var p = $("#pct");
            tween("s", 160, 160 * (1 - r.pct / 100));
            var t0 = null;
            (function f(t) {
                if (t0 === null) t0 = t;
                var q = Math.min(1, (t - t0) / 1500);
                q = 1 - Math.pow(1 - q, 3);
                if (p) p.textContent = Math.round(r.pct * q) + "%";
                if (q < 1) requestAnimationFrame(f);
            })(performance.now());
        }
        if (k === "welcome") setD("w", 70);
        if (k === "loading") {
            clearTimeout(S.lt);
            S.lt = setTimeout(function () {
                var e = $("#ltxt");
                if (e)
                    e.textContent = "Still connecting. Check your connection.";
            }, 10000);
        }
    }
    function updateScreen(k) {
        if (k === "invite") paintInvite();
        else if (k === "p2q") paintP2();
        else if (k === "score") paintScore();
        else if (k === "wait" || k === "reveal") renderScreen(k);
    }
    function sync() {
        var k = key();
        if (k !== S.screen) {
            S.screen = k;
            renderScreen(k);
            window.scrollTo(0, 0);
        } else updateScreen(k);
        var rc = $("#roomchip");
        rc.innerHTML = S.code
            ? '<span class="chip-room">Room ' + S.code + "</span>"
            : "";
    }
    function notice() {
        var e = $("#notice"),
            t = "";
        if (ready && !db)
            t =
                "Playing together needs a signed-in view of this page. Open it from your Claude account and try again.";
        else if (canWrite === false)
            t =
                "You have view-only access, so answers cannot be saved. Ask the owner to share this page with you as a contributor.";
        e.innerHTML = t
            ? '<div class="note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5" stroke-linecap="round"/></svg><div>' +
              t +
              "</div></div>"
            : "";
    }

    /* ---------- data ---------- */
    function gref(code) {
        return db.doc("games/" + code);
    }
    function ansId(who) {
        return S.code + "-r" + S.round + "-" + who;
    }
    function otherSeat() {
        return S.seat === "p1" ? "p2" : "p1";
    }
    function write(patch) {
        S.wq = S.wq
            .then(function () {
                return gref(S.code).update(patch);
            })
            .catch(function () {
                toast("Could not save. Check your connection.");
            });
        return S.wq;
    }
    function persistMine() {
        var snap = clone(S.mine);
        S.wq = S.wq
            .then(function () {
                return db.doc("answers/" + ansId(S.seat)).set(snap);
            })
            .catch(function () {
                toast("Could not save your answer.");
            });
    }
    function subscribeGame() {
        S.subs.forEach(function (u) {
            u();
        });
        S.subs = [];
        S.subs.push(
            gref(S.code).onSnapshot(
                function (snap) {
                    if (!snap.exists) {
                        toast("That room no longer exists.");
                        leave();
                        return;
                    }
                    var g = snap.data();
                    S.game = g;
                    S.loaded.g = true;
                    var r = g.round || 0;
                    if (r !== S.round) {
                        S.round = r;
                        resetRound();
                        if (r) subscribeAnswers();
                    }
                    sync();
                },
                function () {
                    S.fatal = true;
                    sync();
                },
            ),
        );
    }
    function resetRound() {
        S.ansSubs.forEach(function (u) {
            u();
        });
        S.ansSubs = [];
        S.mine = { a: {}, done: false, revealed: false };
        S.other = null;
        S.loaded.me = false;
        S.loaded.ot = false;
        S.qi = 0;
        S.confirm = false;
    }
    function subscribeAnswers() {
        S.ansSubs.push(
            db.doc("answers/" + ansId(S.seat)).onSnapshot(
                function (snap) {
                    if (!S.loaded.me) {
                        S.loaded.me = true;
                        if (snap.exists) {
                            var d = snap.data();
                            S.mine = {
                                a: d.a || {},
                                done: !!d.done,
                                revealed: !!d.revealed,
                            };
                            var n = qCount();
                            S.qi = 0;
                            while (S.qi < n && S.mine.a[S.qi] !== undefined)
                                S.qi++;
                            if (S.qi >= n) S.qi = Math.max(0, n - 1);
                        }
                    }
                    sync();
                },
                function () {
                    S.fatal = true;
                    sync();
                },
            ),
        );
        S.ansSubs.push(
            db.doc("answers/" + ansId(otherSeat())).onSnapshot(
                function (snap) {
                    S.other = snap.exists ? snap.data() : null;
                    S.loaded.ot = true;
                    sync();
                },
                function () {
                    S.fatal = true;
                    sync();
                },
            ),
        );
    }
    function enterRoom(code, seat) {
        S.code = code;
        S.seat = seat;
        S.game = null;
        S.round = -1;
        S.fatal = false;
        S.loaded = { g: false, me: false, ot: false };
        sset("cc:room", code);
        sset("cc:seat", seat);
        subscribeGame();
        sync();
    }
    function leave() {
        S.subs.forEach(function (u) {
            u();
        });
        S.subs = [];
        S.ansSubs.forEach(function (u) {
            u();
        });
        S.ansSubs = [];
        sdel("cc:room");
        sdel("cc:seat");
        S.code = null;
        S.seat = null;
        S.game = null;
        S.view = "welcome";
        S.fatal = false;
        S.screen = null;
        S.mine = { a: {}, done: false, revealed: false };
        S.other = null;
        try {
            history.replaceState(null, "", location.pathname + location.search);
        } catch (e) {}
        sync();
    }
    function buildQs(g, total) {
        var c = [].concat(
            (g.p1Qs || []).map(function (t) {
                return { t: t, by: "p1" };
            }),
            (g.p2Qs || []).map(function (t) {
                return { t: t, by: "p2" };
            }),
        );
        var n = Math.min(Math.max(total, c.length + 10), c.length + SYS.length);
        var sys = shuffle(SYS.slice())
            .slice(0, n - c.length)
            .map(function (t) {
                return { t: t, by: "sys" };
            });
        return { qs: shuffle(c.concat(sys)), total: n };
    }
    function needDb() {
        if (!db) {
            toast("Live play is not available in this view.");
            return false;
        }
        if (canWrite === false) {
            toast("You have view-only access.");
            return false;
        }
        return true;
    }

    /* ---------- actions ---------- */
    var A = {
        home: function () {
            if (S.code) leave();
            else {
                S.view = "welcome";
                sync();
            }
        },
        start: function () {
            S.view = "names";
            sync();
        },
        joinview: function () {
            S.join = {
                stage: "code",
                code: S.join.code || "",
                game: null,
                err: "",
            };
            S.view = "join";
            sync();
        },
        joinback: function () {
            S.join.stage = "code";
            S.join.err = "";
            renderScreen("join");
        },
        toNames: function () {
            S.view = "names";
            sync();
        },
        toQuestions: function () {
            S.view = "questions";
            sync();
        },
        toCount: function () {
            S.view = "count";
            sync();
        },
        rmq: function (b) {
            var i = +b.dataset.i,
                l = curList().slice();
            l.splice(i, 1);
            setList(l);
        },
        copycode: function () {
            copyText(S.code, "#codeEl");
        },
        copymsg: function () {
            copyText(inviteMsg(), "#linkEl");
        },
        create: async function () {
            if (!needDb()) return;
            var btn = $("#createBtn");
            btn.disabled = true;
            var err = $("#err");
            try {
                var code,
                    tries = 0;
                do {
                    code = genCode();
                    var ex = await gref(code).get();
                    tries++;
                } while (ex.exists && tries < 5);
                if (ex.exists) throw new Error("x");
                await db.doc("games/" + code).set({
                    code: code,
                    status: "lobby",
                    round: 0,
                    n1: S.draft.n1,
                    n2: S.draft.n2,
                    joined: false,
                    maybe: S.draft.maybe,
                    total: S.draft.total,
                    p1Qs: S.draft.qs,
                    p2Qs: [],
                    qs: [],
                    created: Date.now(),
                });
                enterRoom(code, "p1");
            } catch (e) {
                btn.disabled = false;
                if (err)
                    err.textContent =
                        "We could not create your room. Please try again.";
            }
        },
        claim: function (b) {
            enterRoom(S.join.code, b.dataset.seat);
        },
        begin: async function () {
            if (!needDb()) return;
            var g = S.game,
                b = buildQs(g, g.total);
            try {
                await S.wq;
                await gref(S.code).update({
                    status: "playing",
                    round: 1,
                    qs: b.qs,
                    total: b.total,
                });
            } catch (e) {
                toast("Could not start. Try again.");
            }
        },
        ans: function (b) {
            var n = qCount(),
                v = b.dataset.v;
            S.mine.a[S.qi] = v;
            var all = true;
            for (var i = 0; i < n; i++)
                if (S.mine.a[i] === undefined) all = false;
            if (S.qi >= n - 1 && all) S.mine.done = true;
            persistMine();
            if (S.mine.done) {
                sync();
                return;
            }
            if (S.qi < n - 1) S.qi++;
            paintPlay();
        },
        back: function () {
            if (S.qi > 0) {
                S.qi--;
                paintPlay();
            }
        },
        reveal: function () {
            S.mine.revealed = true;
            persistMine();
            sync();
        },
        restart: function () {
            if (!S.confirm) {
                S.confirm = true;
                renderScreen("reveal");
                clearTimeout(S.ct);
                S.ct = setTimeout(function () {
                    S.confirm = false;
                    if (S.screen === "reveal") renderScreen("reveal");
                }, 4000);
                return;
            }
            S.confirm = false;
            var g = S.game,
                b = buildQs(g, g.total);
            write({
                round: (g.round || 1) + 1,
                status: "playing",
                qs: b.qs,
                total: b.total,
            });
        },
        reload: function () {
            var c = S.code,
                s = S.seat;
            S.subs.forEach(function (u) {
                u();
            });
            S.ansSubs.forEach(function (u) {
                u();
            });
            enterRoom(c, s);
        },
    };
    document.addEventListener("click", function (e) {
        var b = e.target.closest("[data-act]");
        if (!b || b.disabled) return;
        var f = A[b.dataset.act];
        if (f) f(b, e);
    });

    function setList(l) {
        if (S.code) {
            S.game.p2Qs = l;
            write({ p2Qs: l });
            paintP2();
        } else {
            S.draft.qs = l;
            paintList();
            if (S.screen === "count") paintCount();
        }
    }
    function addQuestion() {
        var inp = $("#qin"),
            err = $("#err"),
            t = inp.value.trim().replace(/\s+/g, " ");
        err.textContent = "";
        if (t.length < 8) {
            err.textContent = "Write a full question, at least 8 characters.";
            return;
        }
        if (!/\?$/.test(t)) t += "?";
        var l = curList().slice();
        if (l.length >= 10) {
            err.textContent = "You can add up to 10 questions.";
            return;
        }
        if (
            l.some(function (x) {
                return x.toLowerCase() === t.toLowerCase();
            })
        ) {
            err.textContent = "You already added that one.";
            return;
        }
        l.push(t);
        setList(l);
        inp.value = "";
        $("#warn").textContent = "";
        inp.focus();
    }
    var FORMS = {
        fNames: function () {
            var a = $("#n1").value.trim(),
                b = $("#n2").value.trim(),
                err = $("#err");
            if (!a || !b) {
                err.textContent = "Please enter both names.";
                return;
            }
            if (a.toLowerCase() === b.toLowerCase()) {
                err.textContent = "Please use two different names.";
                return;
            }
            S.draft.n1 = a;
            S.draft.n2 = b;
            S.view = "questions";
            sync();
        },
        fQ: addQuestion,
        fCode: async function () {
            var c = normCode($("#jc").value),
                err = $("#err");
            S.join.code = c;
            if (c.length < 6) {
                err.textContent = "Codes have 6 letters and numbers.";
                return;
            }
            if (!needDb()) return;
            try {
                var snap = await gref(c).get();
                if (!snap.exists) {
                    err.textContent =
                        "We could not find that room. Check the code and try again.";
                    return;
                }
                var g = snap.data();
                S.join.game = g;
                S.join.err = "";
                S.join.stage = g.joined ? "claim" : "name";
                renderScreen("join");
            } catch (e) {
                err.textContent = "Could not reach the room. Try again.";
            }
        },
        fJoin: async function () {
            var name = $("#jn").value.trim(),
                err = $("#err");
            if (!name) {
                err.textContent = "Please enter your name.";
                return;
            }
            if (name.toLowerCase() === S.join.game.n1.toLowerCase()) {
                err.textContent =
                    "Please use a different name from your partner.";
                return;
            }
            if (!needDb()) return;
            try {
                var ref = gref(S.join.code);
                var lease = await ref.acquire({
                    holder: "join-" + Math.random().toString(36).slice(2),
                    ttlMs: 5000,
                });
                if (!lease.acquired) {
                    err.textContent =
                        "Someone is joining right now. Try again in a moment.";
                    return;
                }
                var fresh = await ref.get();
                if (!fresh.exists) {
                    err.textContent = "That room no longer exists.";
                    return;
                }
                if (fresh.data().joined) {
                    S.join.game = fresh.data();
                    S.join.stage = "claim";
                    renderScreen("join");
                    return;
                }
                await ref.update({ n2: name, joined: true, status: "p2setup" });
                enterRoom(S.join.code, "p2");
            } catch (e) {
                err.textContent = "Could not join. Please try again.";
            }
        },
    };
    document.addEventListener("submit", function (e) {
        e.preventDefault();
        var f = FORMS[e.target.id];
        if (f) f();
    });
    document.addEventListener("input", function (e) {
        var t = e.target;
        if (t.id === "rng") {
            S.draft.total = +t.value;
            paintCount();
        } else if (t.id === "qin") {
            $("#warn").textContent =
                /^(what|why|how|who|when|where|which|tell|describe|explain)\b/i.test(
                    t.value.trim(),
                )
                    ? "This may need more than a Yes or No. Try rephrasing it."
                    : "";
        } else if (t.id === "jc") {
            t.value = t.value.toUpperCase();
        }
    });
    document.addEventListener("change", function (e) {
        if (e.target.id === "maybe") S.draft.maybe = e.target.checked;
    });

    /* ---------- boot ---------- */
    sync();
    (async function () {
        try {
            if (window.claude && claude.use) {
                db = await claude.use("db");
                user = await claude.use("user");
                if (user && db) {
                    try {
                        canWrite = await user.can("data.write");
                    } catch (e) {}
                }
            }
        } catch (e) {
            db = null;
        }
        ready = true;
        notice();
        var h = (location.hash || "").match(/^#join-([A-Za-z0-9]{6,8})$/);
        var room = sget("cc:room"),
            seat = sget("cc:seat");
        if (db && room && seat) {
            enterRoom(room, seat);
        } else if (h && S.screen === "welcome") {
            S.join = {
                stage: "code",
                code: normCode(h[1]),
                game: null,
                err: "",
            };
            S.view = "join";
            sync();
        }
    })();
})();
