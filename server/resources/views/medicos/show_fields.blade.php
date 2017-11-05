<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $medico->id !!}</p>
</div>

<!-- Especialidad Id Field -->
<div class="form-group">
    {!! Form::label('Especialidad_id', 'Especialidad Id:') !!}
    <p>{!! $medico->Especialidad_id !!}</p>
</div>

<!-- Persona Id Field -->
<div class="form-group">
    {!! Form::label('Persona_id', 'Persona Id:') !!}
    <p>{!! $medico->Persona_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $medico->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $medico->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $medico->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $medico->deleted_at !!}</p>
</div>

