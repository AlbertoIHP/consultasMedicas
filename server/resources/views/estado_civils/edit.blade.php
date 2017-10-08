@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Estado Civil
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($estadoCivil, ['route' => ['estadoCivils.update', $estadoCivil->id], 'method' => 'patch']) !!}

                        @include('estado_civils.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection