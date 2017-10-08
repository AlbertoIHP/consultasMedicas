@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Atention
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($atention, ['route' => ['atentions.update', $atention->id], 'method' => 'patch']) !!}

                        @include('atentions.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection