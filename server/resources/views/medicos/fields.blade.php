<!-- Especialidad Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Especialidad_id', 'Especialidad Id:') !!}
    {!! Form::number('Especialidad_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Persona Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Persona_id', 'Persona Id:') !!}
    {!! Form::number('Persona_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('medicos.index') !!}" class="btn btn-default">Cancel</a>
</div>
