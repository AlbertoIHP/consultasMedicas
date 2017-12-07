@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Ocupacion
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($ocupacion, ['route' => ['ocupacions.update', $ocupacion->id], 'method' => 'patch']) !!}

                        @include('ocupacions.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection