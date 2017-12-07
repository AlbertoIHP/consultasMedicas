<!-- Fechainicio Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechaInicio', 'Fechainicio:') !!}
    {!! Form::date('fechaInicio', null, ['class' => 'form-control']) !!}
</div>

<!-- Medicamento Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Medicamento_id', 'Medicamento Id:') !!}
    {!! Form::number('Medicamento_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Paciente Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    {!! Form::number('Paciente_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('alergiasMedicamentosPacientes.index') !!}" class="btn btn-default">Cancel</a>
</div>
