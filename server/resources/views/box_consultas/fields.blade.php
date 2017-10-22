<!-- Ubicacion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('ubicacion', 'Ubicacion:') !!}
    {!! Form::text('ubicacion', null, ['class' => 'form-control']) !!}
</div>

<!-- Tipobox Idtipobox Field -->
<div class="form-group col-sm-6">
    {!! Form::label('TipoBox_idTipoBox', 'Tipobox Idtipobox:') !!}
    {!! Form::number('TipoBox_idTipoBox', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('boxConsultas.index') !!}" class="btn btn-default">Cancel</a>
</div>
