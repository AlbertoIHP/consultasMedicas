@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Alergias Comunes Paciente
        </h1>
    </section>
    <div class="content">
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'alergiasComunesPacientes.store']) !!}

                        @include('alergias_comunes_pacientes.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
