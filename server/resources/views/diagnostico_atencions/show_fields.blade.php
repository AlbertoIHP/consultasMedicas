<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $diagnosticoAtencion->id !!}</p>
</div>

<!-- Atention Cita Idcita Field -->
<div class="form-group">
    {!! Form::label('Atention_Cita_idCita', 'Atention Cita Idcita:') !!}
    <p>{!! $diagnosticoAtencion->Atention_Cita_idCita !!}</p>
</div>

<!-- Diagnostico Iddiagnostico Field -->
<div class="form-group">
    {!! Form::label('Diagnostico_idDiagnostico', 'Diagnostico Iddiagnostico:') !!}
    <p>{!! $diagnosticoAtencion->Diagnostico_idDiagnostico !!}</p>
</div>

<!-- Observacion Field -->
<div class="form-group">
    {!! Form::label('Observacion', 'Observacion:') !!}
    <p>{!! $diagnosticoAtencion->Observacion !!}</p>
</div>

