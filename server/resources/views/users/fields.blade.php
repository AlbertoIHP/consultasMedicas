<!-- Password Field -->
<div class="form-group col-sm-6">
    {!! Form::label('password', 'Password:') !!}
    {!! Form::password('password', ['class' => 'form-control']) !!}
</div>

<!-- Role Idrole Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Role_idRole', 'Role Idrole:') !!}
    {!! Form::number('Role_idRole', null, ['class' => 'form-control']) !!}
</div>

<!-- Persona Rut Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Persona_rut', 'Persona Rut:') !!}
    {!! Form::text('Persona_rut', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('users.index') !!}" class="btn btn-default">Cancel</a>
</div>
