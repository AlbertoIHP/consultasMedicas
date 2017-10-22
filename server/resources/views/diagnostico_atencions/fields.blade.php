<!-- Atention Cita Idcita Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Atention_Cita_idCita', 'Atention Cita Idcita:') !!}
    {!! Form::number('Atention_Cita_idCita', null, ['class' => 'form-control']) !!}
</div>

<!-- Diagnostico Iddiagnostico Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Diagnostico_idDiagnostico', 'Diagnostico Iddiagnostico:') !!}
    {!! Form::number('Diagnostico_idDiagnostico', null, ['class' => 'form-control']) !!}
</div>

<!-- Observacion Field -->
<div class="form-group col-sm-12 col-lg-12">
    {!! Form::label('Observacion', 'Observacion:') !!}
    {!! Form::textarea('Observacion', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('diagnosticoAtencions.index') !!}" class="btn btn-default">Cancel</a>
</div>
