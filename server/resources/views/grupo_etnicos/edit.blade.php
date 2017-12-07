@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Grupo Etnico
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($grupoEtnico, ['route' => ['grupoEtnicos.update', $grupoEtnico->id], 'method' => 'patch']) !!}

                        @include('grupo_etnicos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection