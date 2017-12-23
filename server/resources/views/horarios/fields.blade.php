<!-- Dia Field -->
<div class="form-group col-sm-6">
    {!! Form::label('dia', 'Dia:') !!}
    {!! Form::number('dia', null, ['class' => 'form-control']) !!}
</div>

<!-- Horainicio Field -->
<div class="form-group col-sm-6">
    {!! Form::label('horaInicio', 'Horainicio:') !!}
    {!! Form::number('horaInicio', null, ['class' => 'form-control']) !!}
</div>

<!-- Improvisado Field -->
<div class="form-group col-sm-6">
    {!! Form::label('improvisado', 'Improvisado:') !!}
    {!! Form::number('improvisado', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('horarios.index') !!}" class="btn btn-default">Cancel</a>
</div>
