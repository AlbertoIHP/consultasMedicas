@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Especialidad
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($especialidad, ['route' => ['especialidads.update', $especialidad->id], 'method' => 'patch']) !!}

                        @include('especialidads.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection