<x-layouts>
    {{-- <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <h1 class="font-bold text-7xl text-blue-700">
                Welcome To CoupleCompatibility
            </h1>

            <a href="{{ route('game.step_1') }}" class="flex justify-center items-center mt-10">
                <button class="mx-auto cursor-pointer bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    Test Your Compatibility
                </button>
            </a>
        </div>
    </div> --}}




    <body class="bg-dark text-white">
        <title>CoupleCompatibility</title>
        <meta name="claude:viewport-fit-sides" content="cover">
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,700;1,6..96,500&family=Figtree:wght@400;500;600;700&display=swap">


        <div class="shell">
            <header class="top"><button class="brand" data-act="home"
                    aria-label="CoupleCompatibility home">Couple<i>Compatibility</i></button><span id="roomchip"></span>
            </header>
            <div id="notice"></div>
            <main id="main"></main>
        </div>
        <div id="toast" role="status" aria-live="polite"></div>



    </body>

</x-layouts>
