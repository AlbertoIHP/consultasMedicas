@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Tipo Sangre
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($tipoSangre, ['route' => ['tipoSangres.update', $tipoSangre->id], 'method' => 'patch']) !!}

                        @include('tipo_sangres.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection