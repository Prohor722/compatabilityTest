@php
    $steps = [
        'Join'=>1,
        'Questions'=>2,
        'Begin'=>3,
    ];
@endphp
<ol class="steps" aria-label="Progress">
     @foreach ($steps as $step => $stepId)
        @if ($stepId == $id)
            <li class="on" aria-current="step">{{ $step }}</li>
        @else
            <li class="">{{ $step }}</li>
        @endif
     @endforeach
</ol>
