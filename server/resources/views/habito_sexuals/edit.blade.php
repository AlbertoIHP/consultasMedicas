@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Habito Sexual
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($habitoSexual, ['route' => ['habitoSexuals.update', $habitoSexual->id], 'method' => 'patch']) !!}

                        @include('habito_sexuals.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection