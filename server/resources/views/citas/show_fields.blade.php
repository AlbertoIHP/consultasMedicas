<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $cita->id !!}</p>
</div>

<!-- Fecha Field -->
<div class="form-group">
    {!! Form::label('fecha', 'Fecha:') !!}
    <p>{!! $cita->fecha !!}</p>
</div>

<!-- Hora Field -->
<div class="form-group">
    {!! Form::label('hora', 'Hora:') !!}
    <p>{!! $cita->hora !!}</p>
</div>

<!-- Estadocita Id Field -->
<div class="form-group">
    {!! Form::label('EstadoCita_id', 'Estadocita Id:') !!}
    <p>{!! $cita->EstadoCita_id !!}</p>
</div>

<!-- Boxconsulta Id Field -->
<div class="form-group">
    {!! Form::label('BoxConsulta_id', 'Boxconsulta Id:') !!}
    <p>{!! $cita->BoxConsulta_id !!}</p>
</div>

<!-- Paciente Id Field -->
<div class="form-group">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    <p>{!! $cita->Paciente_id !!}</p>
</div>

<!-- Medico Id Field -->
<div class="form-group">
    {!! Form::label('Medico_id', 'Medico Id:') !!}
    <p>{!! $cita->Medico_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $cita->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $cita->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $cita->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $cita->deleted_at !!}</p>
</div>

