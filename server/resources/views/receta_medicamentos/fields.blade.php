<!-- Receta Idreceta Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Receta_idReceta', 'Receta Idreceta:') !!}
    {!! Form::number('Receta_idReceta', null, ['class' => 'form-control']) !!}
</div>

<!-- Medicamento Idmedicamento Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Medicamento_idMedicamento', 'Medicamento Idmedicamento:') !!}
    {!! Form::number('Medicamento_idMedicamento', null, ['class' => 'form-control']) !!}
</div>

<!-- Receta Has Medicamentocol Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Receta_has_Medicamentocol', 'Receta Has Medicamentocol:') !!}
    {!! Form::text('Receta_has_Medicamentocol', null, ['class' => 'form-control']) !!}
</div>

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

<!-- Viaadministracionmedicamento Idviaadministracionmedicamento Field -->
<div class="form-group col-sm-6">
    {!! Form::label('ViaAdministracionMedicamento_idViaAdministracionMedicamento', 'Viaadministracionmedicamento Idviaadministracionmedicamento:') !!}
    {!! Form::number('ViaAdministracionMedicamento_idViaAdministracionMedicamento', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('recetaMedicamentos.index') !!}" class="btn btn-default">Cancel</a>
</div>
