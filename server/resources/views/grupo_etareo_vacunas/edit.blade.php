@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Grupo Etareo Vacuna
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($grupoEtareoVacuna, ['route' => ['grupoEtareoVacunas.update', $grupoEtareoVacuna->id], 'method' => 'patch']) !!}

                        @include('grupo_etareo_vacunas.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection