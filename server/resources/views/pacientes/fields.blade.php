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

<!-- Grupoetnico Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('GrupoEtnico_id', 'Grupoetnico Id:') !!}
    {!! Form::number('GrupoEtnico_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Ocupacion Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Ocupacion_id', 'Ocupacion Id:') !!}
    {!! Form::number('Ocupacion_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('pacientes.index') !!}" class="btn btn-default">Cancel</a>
</div>
