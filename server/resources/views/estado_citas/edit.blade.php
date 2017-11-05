@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Estado Cita
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($estadoCita, ['route' => ['estadoCitas.update', $estadoCita->id], 'method' => 'patch']) !!}

                        @include('estado_citas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection