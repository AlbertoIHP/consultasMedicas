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

<!-- Pesoactual Field -->
<div class="form-group col-sm-6">
    {!! Form::label('pesoActual', 'Pesoactual:') !!}
    {!! Form::text('pesoActual', null, ['class' => 'form-control']) !!}
</div>

<!-- Estaturaactual Field -->
<div class="form-group col-sm-6">
    {!! Form::label('estaturaActual', 'Estaturaactual:') !!}
    {!! Form::text('estaturaActual', null, ['class' => 'form-control']) !!}
</div>

<!-- Tiposangre Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('TipoSangre_id', 'Tiposangre Id:') !!}
    {!! Form::number('TipoSangre_id', null, ['class' => 'form-control']) !!}
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
