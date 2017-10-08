@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Receta
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($receta, ['route' => ['recetas.update', $receta->id], 'method' => 'patch']) !!}

                        @include('recetas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection