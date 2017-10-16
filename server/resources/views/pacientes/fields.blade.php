<!-- Persona Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Persona_id', 'Persona Id:') !!}
    {!! Form::number('Persona_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Tiposangre Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('TipoSangre_id', 'Tiposangre Id:') !!}
    {!! Form::number('TipoSangre_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('pacientes.index') !!}" class="btn btn-default">Cancel</a>
</div>
