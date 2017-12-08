<!-- Calificacionatencionmedica Field -->
<div class="form-group col-sm-6">
    {!! Form::label('calificacionAtencionMedica', 'Calificacionatencionmedica:') !!}
    {!! Form::number('calificacionAtencionMedica', null, ['class' => 'form-control']) !!}
</div>

<!-- Boxconsulta Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('BoxConsulta_id', 'Boxconsulta Id:') !!}
    {!! Form::number('BoxConsulta_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Cita Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Cita_id', 'Cita Id:') !!}
    {!! Form::number('Cita_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Paciente Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    {!! Form::number('Paciente_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Examenfisico Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('ExamenFisico_id', 'Examenfisico Id:') !!}
    {!! Form::number('ExamenFisico_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('atencions.index') !!}" class="btn btn-default">Cancel</a>
</div>
