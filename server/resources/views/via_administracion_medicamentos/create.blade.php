@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Via Administracion Medicamento
        </h1>
    </section>
    <div class="content">
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'viaAdministracionMedicamentos.store']) !!}

                        @include('via_administracion_medicamentos.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
