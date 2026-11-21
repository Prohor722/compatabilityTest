<x-layouts>
    <div class="flex justify-center items-center h-screen">
        <form action="{{ route('game.step_2') }}" method="POST">
            @csrf
            <label for="name" class="block text-gray-700 font-bold mb-2">Enter Your Name:</label>
            <input type="text" id="name" name="name" class="border border-gray-300 rounded px-3 py-2 mb-4 w-full">

            <label for="partner_name" class="block text-gray-700 font-bold mb-2">Enter Your Partner's Name:</label>
            <input type="text" id="partner_name" name="partner_name" class="border border-gray-300 rounded px-3 py-2 mb-4 w-full" required>

            <button type="submit" class="mx-auto cursor-pointer bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Continue
            </button>
        </form>
    </div>

</x-layouts>