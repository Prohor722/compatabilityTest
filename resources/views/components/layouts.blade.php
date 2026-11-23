<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Compatibility Test</title>
    {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('css/mystyle.css') }}">
</head>

<body>
    <header class="top">
        <a href="{{ route('home') }}">
            <button class="brand" data-act="home" aria-label="CoupleCompatibility home">
                Couple<i>Compatibility</i>
            </button>
        </a>
            <span id="roomchip"></span>
    </header>
    <main id="">
        {{ $slot }}
    </main>
</body>

<footer>
    {{-- <script src="{{ asset('js/custom.js') }}"></script> --}}
</footer>

</html>
