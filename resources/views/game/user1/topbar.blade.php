@php
    $steps = [
        'Names'=>1,
        'Questions'=>2,
        'Count'=>3,
        'Invite'=>4
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
    {{-- <li class="on" aria-current="step">Names {{ $id }}</li>
    <li class="">Questions</li>
    <li class="">Count</li>
    <li class="">Invite</li> --}}
</ol>
