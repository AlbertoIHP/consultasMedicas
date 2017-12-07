@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Uso Medicamento
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($usoMedicamento, ['route' => ['usoMedicamentos.update', $usoMedicamento->id], 'method' => 'patch']) !!}

                        @include('uso_medicamentos.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection