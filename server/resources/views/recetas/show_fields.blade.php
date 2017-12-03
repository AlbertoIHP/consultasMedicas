<!-- Id Field -->
<div class="form-group">
    {!! Form::label('id', 'Id:') !!}
    <p>{!! $receta->id !!}</p>
</div>

<!-- Recetacol Field -->
<div class="form-group">
    {!! Form::label('Recetacol', 'Recetacol:') !!}
    <p>{!! $receta->Recetacol !!}</p>
</div>

<!-- Atencion Id Field -->
<div class="form-group">
    {!! Form::label('Atencion_id', 'Atencion Id:') !!}
    <p>{!! $receta->Atencion_id !!}</p>
</div>

<!-- Remember Token Field -->
<div class="form-group">
    {!! Form::label('remember_token', 'Remember Token:') !!}
    <p>{!! $receta->remember_token !!}</p>
</div>

<!-- Created At Field -->
<div class="form-group">
    {!! Form::label('created_at', 'Created At:') !!}
    <p>{!! $receta->created_at !!}</p>
</div>

<!-- Updated At Field -->
<div class="form-group">
    {!! Form::label('updated_at', 'Updated At:') !!}
    <p>{!! $receta->updated_at !!}</p>
</div>

<!-- Deleted At Field -->
<div class="form-group">
    {!! Form::label('deleted_at', 'Deleted At:') !!}
    <p>{!! $receta->deleted_at !!}</p>
</div>

