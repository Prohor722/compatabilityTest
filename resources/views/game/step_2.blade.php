<x-layouts>
    <div class="flex justify-center items-center h-screen">
        <from action="{{ Route('game.step_2') }}" method="POST">
            @csrf
            <button class="mb-10 bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" 
            onclick="addQuestion()">Add Question</button>
            <div id="questions-container"></div>
            <button type="submit" class="mx-auto cursor-pointer bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Skip/Continue
            </button>
        </from>
    </div>

    <script>
        var n = 1;

        function addQuestion() {
            const questionsContainer = document.getElementById('questions-container');
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-4');

            const questionLabel = document.createElement('label');
            questionLabel.setAttribute('for', 'question');
            questionLabel.classList.add('block', 'text-gray-700', 'font-bold', 'mb-2');
            questionLabel.textContent = 'Enter Your Question ' + n + ':';

            const questionInput = document.createElement('input');
            questionInput.type = 'text';
            questionInput.id =  'question-' + n;
            questionInput.name = 'questions[]';
            questionInput.classList.add('border', 'border-gray-300', 'rounded', 'px-3', 'py-2', 'mb-4', 'w-full');
            questionInput.required = true;

            questionDiv.appendChild(questionLabel);
            questionDiv.appendChild(questionInput);
            questionsContainer.appendChild(questionDiv);
            n++;
        }
    </script>
</x-layouts>