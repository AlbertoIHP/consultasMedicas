@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Habito
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($habito, ['route' => ['habitos.update', $habito->id], 'method' => 'patch']) !!}

                        @include('habitos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection