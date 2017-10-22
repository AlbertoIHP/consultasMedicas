<!-- Recetacol Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Recetacol', 'Recetacol:') !!}
    {!! Form::text('Recetacol', null, ['class' => 'form-control']) !!}
</div>

<!-- Atention Cita Idcita Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Atention_Cita_idCita', 'Atention Cita Idcita:') !!}
    {!! Form::number('Atention_Cita_idCita', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('recetas.index') !!}" class="btn btn-default">Cancel</a>
</div>
