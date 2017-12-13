<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $habitosPaciente->id !!}</p>
</div>

<!-- Fechainicio Field -->
<div class="form-group">
    {!! Form::label('fechaInicio', 'Fechainicio:') !!}
    <p>{!! $habitosPaciente->fechaInicio !!}</p>
</div>

<!-- Habito Id Field -->
<div class="form-group">
    {!! Form::label('Habito_id', 'Habito Id:') !!}
    <p>{!! $habitosPaciente->Habito_id !!}</p>
</div>

<!-- Paciente Id Field -->
<div class="form-group">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    <p>{!! $habitosPaciente->Paciente_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $habitosPaciente->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $habitosPaciente->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $habitosPaciente->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $habitosPaciente->deleted_at !!}</p>
</div>

