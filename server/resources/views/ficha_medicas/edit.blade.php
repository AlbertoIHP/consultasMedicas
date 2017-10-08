@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Ficha Medica
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($fichaMedica, ['route' => ['fichaMedicas.update', $fichaMedica->id], 'method' => 'patch']) !!}

                        @include('ficha_medicas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection