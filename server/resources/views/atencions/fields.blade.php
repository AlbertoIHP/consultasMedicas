<!-- Peso Field -->
<div class="form-group col-sm-6">
    {!! Form::label('peso', 'Peso:') !!}
    {!! Form::text('peso', null, ['class' => 'form-control']) !!}
</div>

<!-- Estatura Field -->
<div class="form-group col-sm-6">
    {!! Form::label('estatura', 'Estatura:') !!}
    {!! Form::text('estatura', null, ['class' => 'form-control']) !!}
</div>

<!-- Calificacion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('calificacion', 'Calificacion:') !!}
    {!! Form::number('calificacion', null, ['class' => 'form-control']) !!}
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
