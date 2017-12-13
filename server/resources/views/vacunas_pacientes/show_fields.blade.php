<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $vacunasPaciente->id !!}</p>
</div>

<!-- Fechavacunacion Field -->
<div class="form-group">
    {!! Form::label('fechaVacunacion', 'Fechavacunacion:') !!}
    <p>{!! $vacunasPaciente->fechaVacunacion !!}</p>
</div>

<!-- Vacuna Id Field -->
<div class="form-group">
    {!! Form::label('Vacuna_id', 'Vacuna Id:') !!}
    <p>{!! $vacunasPaciente->Vacuna_id !!}</p>
</div>

<!-- Paciente Id Field -->
<div class="form-group">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    <p>{!! $vacunasPaciente->Paciente_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $vacunasPaciente->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $vacunasPaciente->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $vacunasPaciente->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $vacunasPaciente->deleted_at !!}</p>
</div>

