<!-- Nombre Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre', 'Nombre:') !!}
    {!! Form::text('nombre', null, ['class' => 'form-control']) !!}
</div>

<!-- Region Idregion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Region_idRegion', 'Region Idregion:') !!}
    {!! Form::number('Region_idRegion', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('provincias.index') !!}" class="btn btn-default">Cancel</a>
</div>
