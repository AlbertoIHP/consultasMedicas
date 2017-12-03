<!-- Recetacol Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Recetacol', 'Recetacol:') !!}
    {!! Form::text('Recetacol', null, ['class' => 'form-control']) !!}
</div>

<!-- Atencion Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Atencion_id', 'Atencion Id:') !!}
    {!! Form::number('Atencion_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('recetas.index') !!}" class="btn btn-default">Cancel</a>
</div>
