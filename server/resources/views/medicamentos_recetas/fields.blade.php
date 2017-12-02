<!-- Dosis Field -->
<div class="form-group col-sm-6">
    {!! Form::label('dosis', 'Dosis:') !!}
    {!! Form::text('dosis', null, ['class' => 'form-control']) !!}
</div>

<!-- Cantidad Field -->
<div class="form-group col-sm-6">
    {!! Form::label('cantidad', 'Cantidad:') !!}
    {!! Form::number('cantidad', null, ['class' => 'form-control']) !!}
</div>

<!-- Tiempo Field -->
<div class="form-group col-sm-6">
    {!! Form::label('tiempo', 'Tiempo:') !!}
    {!! Form::number('tiempo', null, ['class' => 'form-control']) !!}
</div>

<!-- Intervalo Field -->
<div class="form-group col-sm-6">
    {!! Form::label('intervalo', 'Intervalo:') !!}
    {!! Form::number('intervalo', null, ['class' => 'form-control']) !!}
</div>

<!-- Medicamento Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Medicamento_id', 'Medicamento Id:') !!}
    {!! Form::number('Medicamento_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Viaadministracionmedicamento Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('ViaAdministracionMedicamento_id', 'Viaadministracionmedicamento Id:') !!}
    {!! Form::number('ViaAdministracionMedicamento_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Receta Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Receta_id', 'Receta Id:') !!}
    {!! Form::number('Receta_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('medicamentosRecetas.index') !!}" class="btn btn-default">Cancel</a>
</div>
