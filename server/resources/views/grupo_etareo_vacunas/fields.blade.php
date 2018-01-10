<!-- Grupoetareo Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('GrupoEtareo_id', 'Grupoetareo Id:') !!}
    {!! Form::number('GrupoEtareo_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Vacuna Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Vacuna_id', 'Vacuna Id:') !!}
    {!! Form::number('Vacuna_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('grupoEtareoVacunas.index') !!}" class="btn btn-default">Cancel</a>
</div>
