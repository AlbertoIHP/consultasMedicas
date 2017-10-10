@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Historial
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($historial, ['route' => ['historials.update', $historial->id], 'method' => 'patch']) !!}

                        @include('historials.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection