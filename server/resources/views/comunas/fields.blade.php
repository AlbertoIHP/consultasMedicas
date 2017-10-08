<!-- Provincia Idprovincia Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Provincia_idProvincia', 'Provincia Idprovincia:') !!}
    {!! Form::number('Provincia_idProvincia', null, ['class' => 'form-control']) !!}
</div>

<!-- Nombre Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre', 'Nombre:') !!}
    {!! Form::text('nombre', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('comunas.index') !!}" class="btn btn-default">Cancel</a>
</div>
