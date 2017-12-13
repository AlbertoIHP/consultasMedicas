@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Habitos Paciente
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($habitosPaciente, ['route' => ['habitosPacientes.update', $habitosPaciente->id], 'method' => 'patch']) !!}

                        @include('habitos_pacientes.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection