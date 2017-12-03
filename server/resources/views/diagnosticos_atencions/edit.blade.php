@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Diagnosticos Atencion
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($diagnosticosAtencion, ['route' => ['diagnosticosAtencions.update', $diagnosticosAtencion->id], 'method' => 'patch']) !!}

                        @include('diagnosticos_atencions.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection