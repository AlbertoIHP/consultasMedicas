<!-- Estadocita Field -->
<div class="form-group col-sm-6">
    {!! Form::label('estadoCita', 'Estadocita:') !!}
    {!! Form::text('estadoCita', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('estadoCitas.index') !!}" class="btn btn-default">Cancel</a>
</div>
