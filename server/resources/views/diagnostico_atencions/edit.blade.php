@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Diagnostico Atencion
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($diagnosticoAtencion, ['route' => ['diagnosticoAtencions.update', $diagnosticoAtencion->id], 'method' => 'patch']) !!}

                        @include('diagnostico_atencions.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection