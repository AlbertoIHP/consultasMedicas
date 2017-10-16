@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Paciente
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($paciente, ['route' => ['pacientes.update', $paciente->id], 'method' => 'patch']) !!}

                        @include('pacientes.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection