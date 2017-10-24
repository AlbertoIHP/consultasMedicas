<!-- Modulo Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Modulo_id', 'Modulo Id:') !!}
    {!! Form::number('Modulo_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Write Field -->
<div class="form-group col-sm-6">
    {!! Form::label('write', 'Write:') !!}
    {!! Form::number('write', null, ['class' => 'form-control']) !!}
</div>

<!-- Delete Field -->
<div class="form-group col-sm-6">
    {!! Form::label('delete', 'Delete:') !!}
    {!! Form::number('delete', null, ['class' => 'form-control']) !!}
</div>

<!-- Update Field -->
<div class="form-group col-sm-6">
    {!! Form::label('update', 'Update:') !!}
    {!! Form::number('update', null, ['class' => 'form-control']) !!}
</div>

<!-- View Field -->
<div class="form-group col-sm-6">
    {!! Form::label('view', 'View:') !!}
    {!! Form::number('view', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('permisoModulos.index') !!}" class="btn btn-default">Cancel</a>
</div>
