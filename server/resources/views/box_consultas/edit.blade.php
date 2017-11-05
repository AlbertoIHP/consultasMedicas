@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Box Consulta
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($boxConsulta, ['route' => ['boxConsultas.update', $boxConsulta->id], 'method' => 'patch']) !!}

                        @include('box_consultas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection