@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Grupo Etareo
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($grupoEtareo, ['route' => ['grupoEtareos.update', $grupoEtareo->id], 'method' => 'patch']) !!}

                        @include('grupo_etareos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection