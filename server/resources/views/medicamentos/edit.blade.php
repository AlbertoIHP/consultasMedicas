@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Medicamento
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($medicamento, ['route' => ['medicamentos.update', $medicamento->id], 'method' => 'patch']) !!}

                        @include('medicamentos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection