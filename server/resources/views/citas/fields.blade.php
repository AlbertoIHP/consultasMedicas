<!-- Fecha Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fecha', 'Fecha:') !!}
    {!! Form::text('fecha', null, ['class' => 'form-control']) !!}
</div>

<!-- Hora Field -->
<div class="form-group col-sm-6">
    {!! Form::label('hora', 'Hora:') !!}
    {!! Form::text('hora', null, ['class' => 'form-control']) !!}
</div>

<!-- Estadocita Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('EstadoCita_id', 'Estadocita Id:') !!}
    {!! Form::number('EstadoCita_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Boxconsulta Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('BoxConsulta_id', 'Boxconsulta Id:') !!}
    {!! Form::number('BoxConsulta_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Paciente Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    {!! Form::number('Paciente_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Medico Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Medico_id', 'Medico Id:') !!}
    {!! Form::number('Medico_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Disponibilidad Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Disponibilidad_id', 'Disponibilidad Id:') !!}
    {!! Form::number('Disponibilidad_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('citas.index') !!}" class="btn btn-default">Cancel</a>
</div>
