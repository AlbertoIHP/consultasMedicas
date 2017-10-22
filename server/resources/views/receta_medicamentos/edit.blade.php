@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Receta Medicamento
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($recetaMedicamento, ['route' => ['recetaMedicamentos.update', $recetaMedicamento->id], 'method' => 'patch']) !!}

                        @include('receta_medicamentos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection