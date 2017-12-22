<!-- Disponible Field -->
<div class="form-group col-sm-6">
    {!! Form::label('disponible', 'Disponible:') !!}
    {!! Form::number('disponible', null, ['class' => 'form-control']) !!}
</div>

<!-- Medico Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Medico_id', 'Medico Id:') !!}
    {!! Form::number('Medico_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Horario Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Horario_id', 'Horario Id:') !!}
    {!! Form::number('Horario_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('disponibilidads.index') !!}" class="btn btn-default">Cancel</a>
</div>
