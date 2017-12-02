@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Diagnostico
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($diagnostico, ['route' => ['diagnosticos.update', $diagnostico->id], 'method' => 'patch']) !!}

                        @include('diagnosticos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection