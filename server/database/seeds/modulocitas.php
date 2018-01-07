<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class modulocitas extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('EstadoCita')->insert([
        	'nombre' => 'Pendiente de confirmación',
        	'descripcion' => 'Hora agendada pero no confirmada',
        ]);
        DB::table('EstadoCita')->insert([
        	'nombre' => 'Confirmada',
        	'descripcion' => 'El paciente ha confirmado la hora',
        ]);
        DB::table('EstadoCita')->insert([
        	'nombre' => 'No concretada',
        	'descripcion' => 'El paciente no concreta la cita al médico',
        ]);
        DB::table('EstadoCita')->insert([
        	'nombre' => 'Concretada',
        	'descripcion' => 'El paciente ha asistido a la consulta médica',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Fonoaudiología',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Cardiología adulto',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Cardiología infantil',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Dermatología',
        ]);
        DB::table('Especialidad')->insert([
        	'nombre' => 'Reumatología',
        ]);



        DB::table('BoxConsulta')->insert([
            'ubicacion' => 'Piso 1',
            'TipoBox_id' => 1
        ]);

         DB::table('BoxConsulta')->insert([
            'ubicacion' => 'Piso 2',
            'TipoBox_id' => 2
        ]);

        DB::table('BoxConsulta')->insert([
            'ubicacion' => 'Piso 3',
            'TipoBox_id' => 3
        ]);

        DB::table('BoxConsulta')->insert([
            'ubicacion' => 'Piso 4',
            'TipoBox_id' => 4
        ]);

        DB::table('BoxConsulta')->insert([
            'ubicacion' => 'Piso 5',
            'TipoBox_id' => 5
        ]);

       
    }
}
