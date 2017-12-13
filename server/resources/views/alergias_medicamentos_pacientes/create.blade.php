@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Alergias Medicamentos Paciente
        </h1>
    </section>
    <div class="content">
        @include('adminlte-templates::common.errors')
        <div class="box box-primary">

            <div class="box-body">
                <div class="row">
                    {!! Form::open(['route' => 'alergiasMedicamentosPacientes.store']) !!}

                        @include('alergias_medicamentos_pacientes.fields')

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
