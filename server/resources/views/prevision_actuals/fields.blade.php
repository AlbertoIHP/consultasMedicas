<!-- Fechaactualizacion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fechaActualizacion', 'Fechaactualizacion:') !!}
    {!! Form::date('fechaActualizacion', null, ['class' => 'form-control']) !!}
</div>

<!-- Prevision Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Prevision_id', 'Prevision Id:') !!}
    {!! Form::number('Prevision_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Persona Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Persona_id', 'Persona Id:') !!}
    {!! Form::number('Persona_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('previsionActuals.index') !!}" class="btn btn-default">Cancel</a>
</div>
