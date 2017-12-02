<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $medicamento->id !!}</p>
</div>

<!-- Nombrecomun Field -->
<div class="form-group">
    {!! Form::label('nombrecomun', 'Nombrecomun:') !!}
    <p>{!! $medicamento->nombrecomun !!}</p>
</div>

<!-- Nombrecientifico Field -->
<div class="form-group">
    {!! Form::label('nombrecientifico', 'Nombrecientifico:') !!}
    <p>{!! $medicamento->nombrecientifico !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $medicamento->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $medicamento->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $medicamento->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $medicamento->deleted_at !!}</p>
</div>

