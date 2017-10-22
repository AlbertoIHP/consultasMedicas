<!-- Nombre Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre', 'Nombre:') !!}
    {!! Form::text('nombre', null, ['class' => 'form-control']) !!}
</div>

<!-- Write Field -->
<div class="form-group col-sm-6">
    {!! Form::label('write', 'Write:') !!}
    {!! Form::number('write', null, ['class' => 'form-control']) !!}
</div>

<!-- View Field -->
<div class="form-group col-sm-6">
    {!! Form::label('view', 'View:') !!}
    {!! Form::number('view', null, ['class' => 'form-control']) !!}
</div>

<!-- Edit Field -->
<div class="form-group col-sm-6">
    {!! Form::label('edit', 'Edit:') !!}
    {!! Form::number('edit', null, ['class' => 'form-control']) !!}
</div>

<!-- Delete Field -->
<div class="form-group col-sm-6">
    {!! Form::label('delete', 'Delete:') !!}
    {!! Form::number('delete', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('roles.index') !!}" class="btn btn-default">Cancel</a>
</div>
