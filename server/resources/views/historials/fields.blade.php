<!-- Fechaconsulta Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechaConsulta', 'Fechaconsulta:') !!}
    {!! Form::date('fechaConsulta', null, ['class' => 'form-control']) !!}
</div>

<!-- Informacionmedica Field -->
<div class="form-group col-sm-6">
    {!! Form::label('informacionMedica', 'Informacionmedica:') !!}
    {!! Form::text('informacionMedica', null, ['class' => 'form-control']) !!}
</div>

<!-- Fichamedica Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('FichaMedica_id', 'Fichamedica Id:') !!}
    {!! Form::number('FichaMedica_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Habitos Field -->
<div class="form-group col-sm-6">
    {!! Form::label('habitos', 'Habitos:') !!}
    {!! Form::text('habitos', null, ['class' => 'form-control']) !!}
</div>

<!-- Peso Field -->
<div class="form-group col-sm-6">
    {!! Form::label('peso', 'Peso:') !!}
    {!! Form::text('peso', null, ['class' => 'form-control']) !!}
</div>

<!-- Estatura Field -->
<div class="form-group col-sm-6">
    {!! Form::label('estatura', 'Estatura:') !!}
    {!! Form::text('estatura', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('historials.index') !!}" class="btn btn-default">Cancel</a>
</div>
