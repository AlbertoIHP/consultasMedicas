<!-- Nombre Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre', 'Nombre:') !!}
    {!! Form::text('nombre', null, ['class' => 'form-control']) !!}
</div>

<!-- Persona Rut Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Persona_rut', 'Persona Rut:') !!}
    {!! Form::text('Persona_rut', null, ['class' => 'form-control']) !!}
</div>

<!-- Nombreresponsable Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombreResponsable', 'Nombreresponsable:') !!}
    {!! Form::text('nombreResponsable', null, ['class' => 'form-control']) !!}
</div>

<!-- Fechacreacion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechaCreacion', 'Fechacreacion:') !!}
    {!! Form::date('fechaCreacion', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('fichaMedicas.index') !!}" class="btn btn-default">Cancel</a>
</div>
