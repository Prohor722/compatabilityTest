<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Compatibility Test</title>
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('css/mystyle.css') }}">
</head>

<body>
    <header class="top"><button class="brand" data-act="home"
            aria-label="CoupleCompatibility home">Couple<i>Compatibility</i></button><span id="roomchip"></span>
    </header>
    <div id="main">
        @include('game.user1.topbar')
        @yield('user1-contents')
    </div>
</body>

<footer></footer>

</html>
