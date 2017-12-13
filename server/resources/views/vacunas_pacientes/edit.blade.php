@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Vacunas Paciente
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($vacunasPaciente, ['route' => ['vacunasPacientes.update', $vacunasPaciente->id], 'method' => 'patch']) !!}

                        @include('vacunas_pacientes.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection