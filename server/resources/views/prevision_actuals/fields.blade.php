<!-- Fechaactualizacion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechaActualizacion', 'Fechaactualizacion:') !!}
    {!! Form::date('fechaActualizacion', null, ['class' => 'form-control']) !!}
</div>

<!-- Prevision Idprevision Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Prevision_idPrevision', 'Prevision Idprevision:') !!}
    {!! Form::number('Prevision_idPrevision', null, ['class' => 'form-control']) !!}
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
    <a href="{!! route('previsionActuals.index') !!}" class="btn btn-default">Cancel</a>
</div>
