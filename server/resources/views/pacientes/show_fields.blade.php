<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $paciente->id !!}</p>
</div>

<!-- Persona Id Field -->
<div class="form-group">
    {!! Form::label('Persona_id', 'Persona Id:') !!}
    <p>{!! $paciente->Persona_id !!}</p>
</div>

<!-- Tiposangre Id Field -->
<div class="form-group">
    {!! Form::label('TipoSangre_id', 'Tiposangre Id:') !!}
    <p>{!! $paciente->TipoSangre_id !!}</p>
</div>

<!-- Grupoetnico Id Field -->
<div class="form-group">
    {!! Form::label('GrupoEtnico_id', 'Grupoetnico Id:') !!}
    <p>{!! $paciente->GrupoEtnico_id !!}</p>
</div>

<!-- Ocupacion Id Field -->
<div class="form-group">
    {!! Form::label('Ocupacion_id', 'Ocupacion Id:') !!}
    <p>{!! $paciente->Ocupacion_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $paciente->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $paciente->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $paciente->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $paciente->deleted_at !!}</p>
</div>

