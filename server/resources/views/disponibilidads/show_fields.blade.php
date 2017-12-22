<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $disponibilidad->id !!}</p>
</div>

<!-- Disponible Field -->
<div class="form-group">
    {!! Form::label('disponible', 'Disponible:') !!}
    <p>{!! $disponibilidad->disponible !!}</p>
</div>

<!-- Medico Id Field -->
<div class="form-group">
    {!! Form::label('Medico_id', 'Medico Id:') !!}
    <p>{!! $disponibilidad->Medico_id !!}</p>
</div>

<!-- Horario Id Field -->
<div class="form-group">
    {!! Form::label('Horario_id', 'Horario Id:') !!}
    <p>{!! $disponibilidad->Horario_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $disponibilidad->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $disponibilidad->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $disponibilidad->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $disponibilidad->deleted_at !!}</p>
</div>

