@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Historial Ficha
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($historialFicha, ['route' => ['historialFichas.update', $historialFicha->id], 'method' => 'patch']) !!}

                        @include('historial_fichas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection