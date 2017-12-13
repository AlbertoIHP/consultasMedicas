@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Enfermedad Cronica
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($enfermedadCronica, ['route' => ['enfermedadCronicas.update', $enfermedadCronica->id], 'method' => 'patch']) !!}

                        @include('enfermedad_cronicas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection