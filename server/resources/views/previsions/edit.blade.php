@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Prevision
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($prevision, ['route' => ['previsions.update', $prevision->id], 'method' => 'patch']) !!}

                        @include('previsions.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection