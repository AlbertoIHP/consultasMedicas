<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $usoMedicamento->id !!}</p>
</div>

<!-- Fechainicio Field -->
<div class="form-group">
    {!! Form::label('fechaInicio', 'Fechainicio:') !!}
    <p>{!! $usoMedicamento->fechaInicio !!}</p>
</div>

<!-- Medicamento Id Field -->
<div class="form-group">
    {!! Form::label('Medicamento_id', 'Medicamento Id:') !!}
    <p>{!! $usoMedicamento->Medicamento_id !!}</p>
</div>

<!-- Paciente Id Field -->
<div class="form-group">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    <p>{!! $usoMedicamento->Paciente_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $usoMedicamento->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $usoMedicamento->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $usoMedicamento->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $usoMedicamento->deleted_at !!}</p>
</div>

