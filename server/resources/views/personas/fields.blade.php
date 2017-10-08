<!-- Nombre1 Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre1', 'Nombre1:') !!}
    {!! Form::text('nombre1', null, ['class' => 'form-control']) !!}
</div>

<!-- Nombre2 Field -->
<div class="form-group col-sm-6">
    {!! Form::label('nombre2', 'Nombre2:') !!}
    {!! Form::text('nombre2', null, ['class' => 'form-control']) !!}
</div>

<!-- Apellido1 Field -->
<div class="form-group col-sm-6">
    {!! Form::label('apellido1', 'Apellido1:') !!}
    {!! Form::text('apellido1', null, ['class' => 'form-control']) !!}
</div>

<!-- Apellido2 Field -->
<div class="form-group col-sm-6">
    {!! Form::label('apellido2', 'Apellido2:') !!}
    {!! Form::text('apellido2', null, ['class' => 'form-control']) !!}
</div>

<!-- Tipo Field -->
<div class="form-group col-sm-6">
    {!! Form::label('tipo', 'Tipo:') !!}
    {!! Form::text('tipo', null, ['class' => 'form-control']) !!}
</div>

<!-- Idregion Field -->
<div class="form-group col-sm-6">
    {!! Form::label('idRegion', 'Idregion:') !!}
    {!! Form::number('idRegion', null, ['class' => 'form-control']) !!}
</div>

<!-- Idprovincia Field -->
<div class="form-group col-sm-6">
    {!! Form::label('idProvincia', 'Idprovincia:') !!}
    {!! Form::number('idProvincia', null, ['class' => 'form-control']) !!}
</div>

<!-- Fono Casa Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fono_casa', 'Fono Casa:') !!}
    {!! Form::text('fono_casa', null, ['class' => 'form-control']) !!}
</div>

<!-- Fono Trabajo Field -->
<div class="form-group col-sm-6">
    {!! Form::label('fono_trabajo', 'Fono Trabajo:') !!}
    {!! Form::text('fono_trabajo', null, ['class' => 'form-control']) !!}
</div>

<!-- Movil Field -->
<div class="form-group col-sm-6">
    {!! Form::label('movil', 'Movil:') !!}
    {!! Form::text('movil', null, ['class' => 'form-control']) !!}
</div>

<!-- Idgenero Field -->
<div class="form-group col-sm-6">
    {!! Form::label('idGenero', 'Idgenero:') !!}
    {!! Form::number('idGenero', null, ['class' => 'form-control']) !!}
</div>

<!-- Fichamedica Rut Field -->
<div class="form-group col-sm-6">
    {!! Form::label('FichaMedica_rut', 'Fichamedica Rut:') !!}
    {!! Form::text('FichaMedica_rut', null, ['class' => 'form-control']) !!}
</div>

<!-- Estadocivil Idestadocivil Field -->
<div class="form-group col-sm-6">
    {!! Form::label('EstadoCivil_idEstadoCivil', 'Estadocivil Idestadocivil:') !!}
    {!! Form::number('EstadoCivil_idEstadoCivil', null, ['class' => 'form-control']) !!}
</div>

<!-- Comuna Provincia Idprovincia Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Comuna_Provincia_idProvincia', 'Comuna Provincia Idprovincia:') !!}
    {!! Form::number('Comuna_Provincia_idProvincia', null, ['class' => 'form-control']) !!}
</div>

<!-- Comuna Idcomuna Field -->
<div class="form-group col-sm-6">
    {!! Form::label('Comuna_idComuna', 'Comuna Idcomuna:') !!}
    {!! Form::number('Comuna_idComuna', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('personas.index') !!}" class="btn btn-default">Cancel</a>
</div>
