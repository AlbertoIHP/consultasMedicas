<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $role->id !!}</p>
</div>

<!-- Nombre Field -->
<div class="form-group">
    {!! Form::label('nombre', 'Nombre:') !!}
    <p>{!! $role->nombre !!}</p>
</div>

<!-- Write Field -->
<div class="form-group">
    {!! Form::label('write', 'Write:') !!}
    <p>{!! $role->write !!}</p>
</div>

<!-- View Field -->
<div class="form-group">
    {!! Form::label('view', 'View:') !!}
    <p>{!! $role->view !!}</p>
</div>

<!-- Edit Field -->
<div class="form-group">
    {!! Form::label('edit', 'Edit:') !!}
    <p>{!! $role->edit !!}</p>
</div>

<!-- Delete Field -->
<div class="form-group">
    {!! Form::label('delete', 'Delete:') !!}
    <p>{!! $role->delete !!}</p>
</div>

