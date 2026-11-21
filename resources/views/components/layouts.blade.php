<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Compatibility Test</title>
    {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
</head>
<body>
    <main>
        {{ $slot }}
    </main>
</body>

<footer>
    <script src="{{ asset('js/custom.js') }}"></script>
</footer>
</html>