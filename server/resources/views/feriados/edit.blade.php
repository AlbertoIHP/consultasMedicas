@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Feriado
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($feriado, ['route' => ['feriados.update', $feriado->id], 'method' => 'patch']) !!}

                        @include('feriados.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection