<!-- Nombre Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre', 'Nombre:') !!}
    {!! Form::text('nombre', null, ['class' => 'form-control']) !!}
</div>

<!-- Provincia Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Provincia_id', 'Provincia Id:') !!}
    {!! Form::number('Provincia_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('comunas.index') !!}" class="btn btn-default">Cancel</a>
</div>
