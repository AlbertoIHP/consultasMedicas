<!-- Fechaexamen Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechaExamen', 'Fechaexamen:') !!}
    {!! Form::date('fechaExamen', null, ['class' => 'form-control']) !!}
</div>

<!-- Peso Field -->
<div class="form-group col-sm-6">
    {!! Form::label('peso', 'Peso:') !!}
    {!! Form::number('peso', null, ['class' => 'form-control']) !!}
</div>

<!-- Estatura Field -->
<div class="form-group col-sm-6">
    {!! Form::label('estatura', 'Estatura:') !!}
    {!! Form::number('estatura', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('examenFisicos.index') !!}" class="btn btn-default">Cancel</a>
</div>
