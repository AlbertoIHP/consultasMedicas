<!-- Verdadero Field -->
<div class="form-group col-sm-6">
    {!! Form::label('verdadero', 'Verdadero:') !!}
    {!! Form::number('verdadero', null, ['class' => 'form-control']) !!}
</div>

<!-- Habitosexual Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('HabitoSexual_id', 'Habitosexual Id:') !!}
    {!! Form::number('HabitoSexual_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Paciente Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Paciente_id', 'Paciente Id:') !!}
    {!! Form::number('Paciente_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('habitosSexualesPacientes.index') !!}" class="btn btn-default">Cancel</a>
</div>
