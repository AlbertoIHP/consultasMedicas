<!-- Fichamedicacol Field -->
<div class="form-group col-sm-6">
    {!! Form::label('FichaMedicacol', 'Fichamedicacol:') !!}
    {!! Form::text('FichaMedicacol', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('fichaMedicas.index') !!}" class="btn btn-default">Cancel</a>
</div>
