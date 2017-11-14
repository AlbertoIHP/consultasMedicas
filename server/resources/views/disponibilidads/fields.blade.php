<!-- Dia Field -->
<div class="form-group col-sm-6">
    {!! Form::label('dia', 'Dia:') !!}
    {!! Form::text('dia', null, ['class' => 'form-control']) !!}
</div>

<!-- Hora Inicio Field -->
<div class="form-group col-sm-6">
    {!! Form::label('hora_inicio', 'Hora Inicio:') !!}
    {!! Form::text('hora_inicio', null, ['class' => 'form-control']) !!}
</div>

<!-- Hora Termino Field -->
<div class="form-group col-sm-6">
    {!! Form::label('hora_termino', 'Hora Termino:') !!}
    {!! Form::text('hora_termino', null, ['class' => 'form-control']) !!}
</div>

<!-- Medico Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Medico_id', 'Medico Id:') !!}
    {!! Form::number('Medico_id', null, ['class' => 'form-control']) !!}
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
