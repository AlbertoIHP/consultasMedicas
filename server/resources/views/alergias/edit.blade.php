@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Alergia
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($alergia, ['route' => ['alergias.update', $alergia->id], 'method' => 'patch']) !!}

                        @include('alergias.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection