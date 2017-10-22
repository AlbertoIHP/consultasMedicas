<!-- Fecha Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fecha', 'Fecha:') !!}
    {!! Form::date('fecha', null, ['class' => 'form-control']) !!}
</div>

<!-- Consulta Idconsulta Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Consulta_idConsulta', 'Consulta Idconsulta:') !!}
    {!! Form::number('Consulta_idConsulta', null, ['class' => 'form-control']) !!}
</div>

<!-- Doctor Rut Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Doctor_rut', 'Doctor Rut:') !!}
    {!! Form::text('Doctor_rut', null, ['class' => 'form-control']) !!}
</div>

<!-- Persona Rut Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Persona_rut', 'Persona Rut:') !!}
    {!! Form::text('Persona_rut', null, ['class' => 'form-control']) !!}
</div>

<!-- Fechahora Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechahora', 'Fechahora:') !!}
    {!! Form::date('fechahora', null, ['class' => 'form-control']) !!}
</div>

<!-- Estadocita Idestadocita Field -->
<div class="form-group col-sm-6">
    {!! Form::label('EstadoCita_idEstadoCita', 'Estadocita Idestadocita:') !!}
    {!! Form::number('EstadoCita_idEstadoCita', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('citas.index') !!}" class="btn btn-default">Cancel</a>
</div>
