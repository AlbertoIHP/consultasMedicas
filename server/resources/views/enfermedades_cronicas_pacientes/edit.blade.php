@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Enfermedades Cronicas Paciente
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($enfermedadesCronicasPaciente, ['route' => ['enfermedadesCronicasPacientes.update', $enfermedadesCronicasPaciente->id], 'method' => 'patch']) !!}

                        @include('enfermedades_cronicas_pacientes.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection