@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Prevision Actual
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($previsionActual, ['route' => ['previsionActuals.update', $previsionActual->id], 'method' => 'patch']) !!}

                        @include('prevision_actuals.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection