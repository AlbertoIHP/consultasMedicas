<!-- Cita Idcita Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Cita_idCita', 'Cita Idcita:') !!}
    {!! Form::number('Cita_idCita', null, ['class' => 'form-control']) !!}
</div>

<!-- Doctor Rut Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Doctor_rut', 'Doctor Rut:') !!}
    {!! Form::text('Doctor_rut', null, ['class' => 'form-control']) !!}
</div>

<!-- Boxconsulta Idconsulta Field -->
<div class="form-group col-sm-6">
    {!! Form::label('BoxConsulta_idConsulta', 'Boxconsulta Idconsulta:') !!}
    {!! Form::number('BoxConsulta_idConsulta', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('atentions.index') !!}" class="btn btn-default">Cancel</a>
</div>
