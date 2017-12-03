<!-- Diagnostico Field -->
<div class="form-group col-sm-6">
    {!! Form::label('diagnostico', 'Diagnostico:') !!}
    {!! Form::text('diagnostico', null, ['class' => 'form-control']) !!}
</div>

<!-- Remember Token Field -->
<div class="form-group col-sm-6">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    {!! Form::text('remember_token', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('diagnosticos.index') !!}" class="btn btn-default">Cancel</a>
</div>
